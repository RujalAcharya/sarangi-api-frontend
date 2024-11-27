"use client";

import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [note, setNote] = useState("");
  const [metadata, setMetadata] = useState(null);
  const [audioSrc, setAudioSrc] = useState(null);
  const [error, setError] = useState("");

  const fetchNote = async () => {
    try {
      setError("");
      setMetadata(null);
      setAudioSrc(null);

      const response = await axios.get(`http://0.0.0.0:8000/note/${note}`);
      const { metadata, wav_file_base64 } = response.data;

      setMetadata(metadata);
      setAudioSrc(`data:audio/wav;base64,${wav_file_base64}`);
    } catch (err) {
      setError(err.response?.data?.detail || "An error occurred.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center text-black p-4">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Sarangi Notes</h1>
      <div className="w-full max-w-md bg-white rounded shadow p-6">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter note name (e.g., A)"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={fetchNote}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          Fetch Note
        </button>
      </div>

      {error && (
        <div className="mt-4 text-red-600">
          <strong>Error:</strong> {error}
        </div>
      )}

      {metadata && (
        <div className="mt-6 w-full max-w-md bg-white rounded shadow p-6">
          <h2 className="text-xl font-bold mb-4">Metadata</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>Duration:</strong> {metadata.duration || "Unknown"}
            </li>
            <li>
              <strong>Sample Rate:</strong> {metadata.sample_rate || "Unknown"}
            </li>
            <li>
              <strong>Channels:</strong> {metadata.channels || "Unknown"}
            </li>
            <li>
              <strong>Bitrate:</strong> {metadata.bitrate || "Unknown"}
            </li>
          </ul>
        </div>
      )}

      {audioSrc && (
        <div className="mt-6 w-full max-w-md bg-white rounded shadow p-6">
          <h2 className="text-xl font-bold mb-4">Audio</h2>
          <audio controls className="w-full">
            <source src={audioSrc} type="audio/wav" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
    </div>
  );
}
