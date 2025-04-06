// src/components/RecorderUI.jsx
import { useVoice } from "../context/VoiceContext";

export default function RecorderUI() {
  const { recording, transcript, startRecording, stopRecording } = useVoice();

  return (
    <div className="p-4">
      <button
        onClick={recording ? stopRecording : startRecording}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {recording ? "Stop Recording" : "Start Recording"}
      </button>

      {transcript && (
        <div className="mt-4">
          <h2 className="font-bold">Transcripción:</h2>
          <p>{transcript}</p>
        </div>
      )}
    </div>
  );
}
