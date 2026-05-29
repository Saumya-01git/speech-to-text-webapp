import { useState, useRef, useEffect } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import UploadCard from "./components/UploadCard";
import HistoryCard from "./components/HistoryCard";

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
  <div className="min-h-screen relative overflow-hidden flex flex-col justify-center items-center bg-gradient-to-br from-black via-blue-950 to-red-950 font-sans p-4">
    <div className="absolute top-40 left-20 w-72 h-72 bg-orange-500/20 blur-3xl rounded-full"></div>

<div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-500/20 blur-3xl rounded-full"></div>

<div className="absolute top-1/2 left-1/2 w-96 h-96 bg-yellow-400/10 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2"></div>
    <Navbar />
    <div className="absolute w-72 h-72 bg-orange-500/20 blur-3xl rounded-full top-20 left-10"></div>

<div className="absolute w-72 h-72 bg-amber-300/20 blur-3xl rounded-full bottom-10 right-10"></div>
<div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04),transparent_60%)]"></div>

    {/* HOME SECTION */}
    <section
      id="home"
      className="min-h-screen flex justify-center items-center px-4"
    >
      <Hero />
    </section>

    {/* TRANSCRIBE SECTION */}
    {/* TRANSCRIBE SECTION */}
<section
  id="transcribe"
  className="min-h-screen flex flex-col justify-center items-center px-4"
>

  <UploadCard
    file={file}
    handleFileChange={handleFileChange}
    handleUpload={handleUpload}
    loading={loading}
    recording={recording}
    startRecording={startRecording}
    stopRecording={stopRecording}
    listening={listening}
    startLiveSpeech={startLiveSpeech}
    stopLiveSpeech={stopLiveSpeech}
    message={message}
    liveText={liveText}
    transcription={transcription}
  />

  <div className="grid md:grid-cols-3 gap-5 mt-8 w-full max-w-5xl">

    <div className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-3xl p-6 text-white hover:scale-105 transition-all duration-500">
      <h2 className="text-2xl font-bold mb-3">
        ⚡ Fast Processing
      </h2>

      <p className="text-gray-300">
        Convert audio into text within seconds using AI-powered transcription.
      </p>
    </div>

    <div className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-3xl p-6 text-white hover:scale-105 transition-all duration-500">
      <h2 className="text-2xl font-bold mb-3">
        🎙 Live Recognition
      </h2>

      <p className="text-gray-300">
        Speak directly into your microphone and get real-time text instantly.
      </p>
    </div>

    <div className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-3xl p-6 text-white hover:scale-105 transition-all duration-500">
      <h2 className="text-2xl font-bold mb-3">
        📜 Smart History
      </h2>

      <p className="text-gray-300">
        Access and manage all your previous transcriptions anytime.
      </p>
    </div>

  </div>

</section>

    {/* HISTORY SECTION */}
    <section
      id="history"
      className="min-h-screen flex flex-col justify-center items-center px-4 py-24"
    >
      <HistoryCard history={history} />
    </section>

  </div>
);
}

export default App;