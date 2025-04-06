import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { PorcupineWorkerFactory } from "@picovoice/porcupine-web-en-worker";
import { WebVoiceProcessor } from "@picovoice/web-voice-processor";

const VoiceContext = createContext(null);

export const VoiceProvider = ({ children }) => {
  const [recording, setRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const mediaRecorderRef = useRef(null);
  const audioChunks = useRef([]);

  const startRecording = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;
    audioChunks.current = [];

    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        audioChunks.current.push(e.data);
      }
    };

    mediaRecorder.onstop = async () => {
      const audioBlob = new Blob(audioChunks.current, { type: "audio/webm" });
      const formData = new FormData();
      formData.append("audio", audioBlob, "audio.webm");

      try {
        const response = await fetch("http://127.0.0.1:8000/api/airelief/upload/", {
          method: "POST",
          body: formData,
        });
        const data = await response.json();
        setTranscript(data.data);
      } catch (error) {
        console.error("Error al enviar audio:", error);
      }
    };

    mediaRecorder.start();
    setRecording(true);
  }, []);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  }, []);

  const handleWakeWord = useCallback(() => {
    console.log("Wake word detected: 'hey jarvis'");
    if (!recording) {
      startRecording();
      setTimeout(stopRecording, 10000);
    }
  }, [recording, startRecording, stopRecording]);

  useEffect(() => {
    const initWakeWord = async () => {
      try {
        const porcupine = await PorcupineWorkerFactory(
          [{ builtin: "jarvis", sensitivity: 0.7 }],
          handleWakeWord
        );
        await WebVoiceProcessor.subscribe(porcupine);
        console.log("Wake word detection ready (say: 'hey jarvis')");
      } catch (error) {
        console.error("Error initializing wake word detection:", error);
      }
    };

    initWakeWord();

    return () => {
      WebVoiceProcessor.unsubscribe();
    };
  }, [handleWakeWord]);

  return (
    <VoiceContext.Provider
      value={{
        recording,
        transcript,
        startRecording,
        stopRecording,
      }}
    >
      {children}
    </VoiceContext.Provider>
  );
};

export const useVoice = () => useContext(VoiceContext);

