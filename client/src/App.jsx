import { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [transcript, setTranscript] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file first");
      return;
    }

    const formData = new FormData();
    formData.append("audio", file);

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/transcribe",
        formData
      );

      setTranscript(res.data.text);
      setMessage("Transcription successful");

    } catch (error) {

      setMessage("Transcription failed");
      console.log(error);

    } finally {

      setLoading(false);
    }
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
          width: "450px",
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

        <p
          style={{
            color: "gray",
            marginBottom: "25px",
          }}
        >
          Upload your audio file and convert speech into text.
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
          onClick={handleUpload}
          style={{
            backgroundColor: "#243b55",
            color: "white",
            border: "none",
            padding: "12px 25px",
            borderRadius: "10px",
            cursor: "pointer",
            fontSize: "16px",
            width: "100%",
            transition: "0.3s",
          }}
        >
          {loading ? "Converting..." : "Convert To Text"}
        </button>

        {message && (
          <p
            style={{
              marginTop: "20px",
              color: message.includes("successful")
                ? "green"
                : "red",
              fontWeight: "bold",
            }}
          >
            {message}
          </p>
        )}

        {transcript && (
          <div
            style={{
              marginTop: "25px",
              padding: "20px",
              backgroundColor: "#f8f9fa",
              borderRadius: "12px",
              textAlign: "left",
            }}
          >
            <h3
              style={{
                color: "#243b55",
                marginBottom: "10px",
              }}
            >
              📝 Transcript
            </h3>

            <p
              style={{
                color: "#333",
                lineHeight: "1.6",
              }}
            >
              {transcript}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;