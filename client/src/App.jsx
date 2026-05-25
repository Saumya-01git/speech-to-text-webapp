import { useState, useRef } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [transcription, setTranscription] = useState("");
  const [loading, setLoading] = useState(false);
  const [recording, setRecording] = useState(false);
  const [liveText, setLiveText] = useState("");
  const [listening, setListening] = useState(false);

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
      setMessage("");
      setTranscription("");

      const res = await axios.post(
        "http://localhost:5000/transcribe",
        formData
      );

      setTranscription(res.data.text);
      setMessage("Transcription completed ✅");

    } catch (error) {
      console.log(error);
      setMessage("Transcription failed ❌");

    } finally {
      setLoading(false);
    }
  };

  const startRecording = async () => {

  try {

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

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to right, #ffecd2, #fcb69f)",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "40px",
          borderRadius: "20px",
          width: "420px",
          textAlign: "center",
          boxShadow: "0px 8px 20px rgba(0,0,0,0.3)",
        }}
      >
        <h1
          style={{
            marginBottom: "10px",
            color: "#243b55",
            fontSize: "32px",
          }}
        >
          🎤 Speech To Text
        </h1>

        <p style={{ color: "gray", marginBottom: "25px" }}>
          Upload or record audio and convert speech into text.
        </p>

        <div
          style={{
            border: "2px dashed #243b55",
            borderRadius: "12px",
            padding: "20px",
            marginBottom: "20px",
            backgroundColor: "#f8f9fa",
          }}
        >
          <input
            type="file"
            onChange={handleFileChange}
            style={{
              width: "100%",
              cursor: "pointer",
            }}
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
          style={{
            backgroundColor: "#243b55",
            color: "white",
            border: "none",
            padding: "12px 25px",
            borderRadius: "10px",
            cursor: "pointer",
            fontSize: "16px",
            width: "100%",
            marginBottom: "15px",
          }}
        >
          {loading ? "Converting..." : "Convert To Text"}
        </button>

        {!recording ? (
          <button
            onClick={startRecording}
            style={{
              backgroundColor: "#008000",
              color: "white",
              border: "none",
              padding: "12px 25px",
              borderRadius: "10px",
              cursor: "pointer",
              fontSize: "16px",
              width: "100%",
            }}
          >
            🎙 Start Recording
          </button>
        ) : (
          <button
            onClick={stopRecording}
            style={{
              backgroundColor: "#cc0000",
              color: "white",
              border: "none",
              padding: "12px 25px",
              borderRadius: "10px",
              cursor: "pointer",
              fontSize: "16px",
              width: "100%",
            }}
          >
            ⏹ Stop Recording
          </button>
        )}
        <button
          onClick={startLiveSpeech}
          style={{
            backgroundColor: "#ff6600",
            color: "white",
            border: "none",
            padding: "12px 25px",
            borderRadius: "10px",
            cursor: "pointer",
            fontSize: "16px",
            width: "100%",
            marginTop: "15px",
          }}
        >
          {listening
            ? "🎤 Listening... Speak now"
            : "⚡ Start Live Speech"}
        </button>

        {listening && (
            <button
              onClick={stopLiveSpeech}
              style={{
                backgroundColor: "#cc0000",
                color: "white",
                border: "none",
                padding: "12px 25px",
                borderRadius: "10px",
                cursor: "pointer",
                fontSize: "16px",
                width: "100%",
                marginTop: "10px",
              }}
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
      </div>
    </div>
  );
}

export default App;