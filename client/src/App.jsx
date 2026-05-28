import { useState, useRef, useEffect } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [transcription, setTranscription] = useState("");
  const [loading, setLoading] = useState(false);
  const [recording, setRecording] = useState(false);
  const [liveText, setLiveText] = useState("");
  const [listening, setListening] = useState(false);
  const [history, setHistory] = useState([]);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const recognitionRef = useRef(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (audioFile) => {
  const selectedFile = audioFile || file;

  if (!selectedFile) {
    setMessage("Please select or record audio");
    return;
  }

  const formData = new FormData();
  formData.append("audio", selectedFile);

  try {
    setLoading(true);

    // RESET OLD DATA
    setMessage("");
    setTranscription("");
    setLiveText("");

    const res = await axios.post(
      "http://localhost:5000/transcribe",
      formData
    );

    setTranscription(res.data.text);
    setMessage("Transcription completed ✅");

    fetchHistory();

  } catch (error) {

    console.log(error);

    setMessage("Transcription failed ❌");

  } finally {

    setLoading(false);
    setFile(null);
  }
};

  const startRecording = async () => {

  try {

    setTranscription("");
    setLiveText("");
    setMessage("");

    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });

    const mediaRecorder = new MediaRecorder(stream);

    mediaRecorderRef.current = mediaRecorder;
    audioChunksRef.current = [];

    mediaRecorder.ondataavailable = (event) => {
      audioChunksRef.current.push(event.data);
    };

    mediaRecorder.onstop = async () => {

      const audioBlob = new Blob(audioChunksRef.current, {
        type: "audio/wav",
      });

      const recordedFile = new File(
        [audioBlob],
        "recording.wav",
        {
          type: "audio/wav",
        }
      );

      handleUpload(recordedFile);
    };

    mediaRecorder.start();
    setRecording(true);

  } catch (error) {

    console.log(error);

    alert("Microphone access denied");
  }
};

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setRecording(false);
  };

  const startLiveSpeech = () => {

    setTranscription("");
    setLiveText("");
    setMessage("");

    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition not supported");
      return;
    }

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;

    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event) => {

      let transcript = "";

      for (
        let i = event.resultIndex;
        i < event.results.length;
        i++
      ) {
        transcript += event.results[i][0].transcript;
      }

      setLiveText(transcript);
    };
    recognition.onend = () => {
      setListening(false);
    };

    recognition.start();
    setListening(true);
  };

  const stopLiveSpeech = () => {

    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }

    setListening(false);
  };

  const fetchHistory = async () => {

  try {

    const res = await axios.get(
      "http://localhost:5000/history"
    );

    setHistory(res.data);

  } catch (error) {

    console.log(error);
  }
};

useEffect(() => {
  fetchHistory();
}, []);

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-orange-100 to-orange-300 font-sans p-4">
      <div className="bg-white p-10 rounded-3xl w-full max-w-md text-center shadow-2xl">
        <h1 className="mb-3 text-slate-800 text-4xl font-bold">
          🎤 Speech To Text
        </h1>

        <p style={{ color: "gray", marginBottom: "25px" }}>
          Upload or record audio and convert speech into text.
        </p>

        <div className="border-2 border-dashed border-slate-600 rounded-2xl p-5 mb-5 bg-slate-100">
          <input
  type="file"
  onChange={handleFileChange}
  className="w-full cursor-pointer text-sm"
/>
        </div>

        {file && (
          <p
            style={{
              marginBottom: "15px",
              color: "#333",
              fontWeight: "bold",
            }}
          >
            Selected File: {file.name}
          </p>
        )}

        <button
  onClick={() => handleUpload()}
  className="bg-slate-800 hover:bg-slate-900 transition-all text-white py-3 px-6 rounded-xl cursor-pointer text-base w-full mb-4 font-semibold"
>
          {loading ? "Converting..." : "Convert To Text"}
        </button>

        {!recording ? (
          <button
            onClick={startRecording}
            className="bg-green-600 hover:bg-green-700 transition-all text-white py-3 px-6 rounded-xl cursor-pointer text-base w-full font-semibold"
          >
            🎙 Start Recording
          </button>
        ) : (
          <button
            onClick={stopRecording}
            className="bg-red-600 hover:bg-red-700 transition-all text-white py-3 px-6 rounded-xl cursor-pointer text-base w-full font-semibold"
          >
            ⏹ Stop Recording
          </button>
        )}
        <button
  onClick={startLiveSpeech}
  className="bg-orange-500 hover:bg-orange-600 transition-all text-white py-3 px-6 rounded-xl cursor-pointer text-base w-full mt-4 font-semibold"
>
          {listening
            ? "🎤 Listening... Speak now"
            : "⚡ Start Live Speech"}
        </button>

        {listening && (
            <button
              onClick={stopLiveSpeech}
              className="bg-red-600 hover:bg-red-700 transition-all text-white py-3 px-6 rounded-xl cursor-pointer text-base w-full mt-3 font-semibold"
            >
              🛑 Stop Live Speech
            </button>
        )}
        {message && (
          <p
            style={{
              marginTop: "20px",
              fontWeight: "bold",
            }}
          >
            {message}
          </p>
        )}
        {liveText && (
          <div
            style={{
              marginTop: "20px",
              padding: "15px",
              backgroundColor: "#fff3cd",
              borderRadius: "10px",
              textAlign: "left",
            }}
          >
            <h3>Live Speech:</h3>

            <p>{liveText}</p>
          </div>
        )}
        {transcription && (
          <div
            style={{
              marginTop: "20px",
              padding: "15px",
              backgroundColor: "#f1f1f1",
              borderRadius: "10px",
              textAlign: "left",
            }}
          >
            <h3>Transcription:</h3>

            <p>{transcription}</p>
          </div>
        )}
        {history.length > 0 && (
  <div
    style={{
      marginTop: "20px",
      textAlign: "left",
    }}
  >
    <h3>History:</h3>

    {history.map((item) => (
      <div
        key={item._id}
        style={{
          backgroundColor: "#e9ecef",
          padding: "10px",
          borderRadius: "10px",
          marginTop: "10px",
        }}
      >
        <p>
          <strong>File:</strong> {item.fileName}
        </p>

        <p>
          <strong>Text:</strong> {item.text}
        </p>
      </div>
    ))}
  </div>
)}
      </div>
    </div>
  );
}

export default App;