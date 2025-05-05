import { useState, useRef } from "react";

export default function AudioRecorder() {
  const [recording, setRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const mediaRecorderRef = useRef(null);
  const audioChunks = useRef([]);

  const startRecording = async () => {
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

      const response = await fetch("https://relief.a.alfcomputacion.com/api/airelief/upload/", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setTranscript(data.data);
    };

    mediaRecorder.start();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setRecording(false);
  };

  return (
    <div className="p-4">
      <p>Audio to Text recorder</p>
      <button
        onClick={recording ? stopRecording : startRecording}
        className="bg-blue-600 text-primary px-4 py-2 rounded"
      >
        {recording ? "Stop Recording" : "Start Recording"}
      </button>

      {transcript && (
        <div className="mt-4">
          <h2 className="font-bold">Transcripción: *** </h2>
          <p>{transcript}</p>
        </div>
      )}
      
    </div>
  );
}


