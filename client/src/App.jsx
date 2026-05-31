import { useState, useRef, useEffect } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import UploadCard from "./components/UploadCard";
import HistoryCard from "./components/HistoryCard";
import { FiCopy } from "react-icons/fi";

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [transcription, setTranscription] = useState("");
  const [loading, setLoading] = useState(false);
  const [recording, setRecording] = useState(false);
  const [liveText, setLiveText] = useState("");
  const [listening, setListening] = useState(false);
  const [history, setHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const recognitionRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
  const selectedFile = e.target.files[0];

  if (!selectedFile) return;

  if (!selectedFile.type.startsWith("audio/")) {
    setFile(null);
    setMessage("Please upload a valid audio file only");
    e.target.value = "";
    return;
  }

  setFile(selectedFile);
  setMessage("");

  e.target.value = "";
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

if (fileInputRef.current) {
  fileInputRef.current.value = "";
}
  }
};

const resetTranscription = () => {
  setFile(null);
  setMessage("");
  setTranscription("");
  setLiveText("");

  if (fileInputRef.current) {
    fileInputRef.current.value = "";
  }
};  

const copyText = (text) => {
  navigator.clipboard.writeText(text);
  alert("Copied to clipboard ✅");
};

const handleDeleteHistory = async (id) => {
  try {
    await axios.delete(`http://localhost:5000/history/${id}`);
    fetchHistory();
  } catch (error) {
    console.log(error);
    alert("Failed to delete history item");
  }
};

const handleClearHistory = async () => {
  const confirmed = window.confirm(
    "Are you sure you want to clear all history?"
  );

  if (!confirmed) return;

  try {
    await axios.delete("http://localhost:5000/history");
    fetchHistory();
  } catch (error) {
    console.log(error);
    alert("Failed to clear history");
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
    recognition.lang = "en-US";

    recognition.onresult = (event) => {

  let finalTranscript = "";
  let interimTranscript = "";

  for (
    let i = event.resultIndex;
    i < event.results.length;
    i++
  ) {

    const transcript =
      event.results[i][0].transcript;

    if (event.results[i].isFinal) {
      finalTranscript += transcript;
    } else {
      interimTranscript += transcript;
    }
  }

  setLiveText(
    finalTranscript + interimTranscript
  );
};
    recognition.onend = () => {

  if (listening) {
    recognition.start();
  }
};

    recognition.start();
    setListening(true);
  };

  const stopLiveSpeech = () => {

  setListening(false);

  if (recognitionRef.current) {
    recognitionRef.current.stop();
  }
};

  const fetchHistory = async () => {
  try {
    setHistoryLoading(true);

    const res = await axios.get(
      "http://localhost:5000/history"
    );

    setHistory(res.data);

  } catch (error) {
    console.log(error);
  } finally {
    setHistoryLoading(false);
  }
};

useEffect(() => {
  fetchHistory();
}, []);

  return (
  <div
  className={`min-h-screen relative overflow-hidden flex flex-col justify-center items-center font-sans p-4 transition-all duration-500 ${
    darkMode
  ? "bg-gradient-to-br from-[#050816] via-[#0B1120] to-[#111827] text-white"
  : "bg-gradient-to-br from-[#FFF0E4] via-[#FFF7F0] to-[#FFE0C5] text-[#1E293B]"
  }`}
>
    <div className="absolute top-40 left-20 w-72 h-72 bg-[#24B1B1]/10 blur-3xl rounded-full"></div>

<div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-500/20 blur-3xl rounded-full"></div>

<div className="absolute top-1/2 left-1/2 w-96 h-96 bg-yellow-400/10 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2"></div>
    <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
    <div className="absolute w-72 h-72 bg-[#007979]/10 blur-3xl rounded-full top-20 left-10"></div>

<div className="absolute w-72 h-72 bg-amber-300/20 blur-3xl rounded-full bottom-10 right-10"></div>
<div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04),transparent_60%)]"></div>

    {/* HOME SECTION */}
    <section
      id="home"
      className="min-h-screen flex justify-center items-center px-4"
    >
      <Hero darkMode={darkMode} />
    </section>

    {/* TRANSCRIBE SECTION */}
    {/* TRANSCRIBE SECTION */}
<section
  id="transcribe"
  className="min-h-screen flex flex-col items-center px-4 pt-32 pb-20"
>

  <div className="grid md:grid-cols-3 gap-8 w-full max-w-7xl relative">

  {/* Upload Card */}
  <div
  className={`group relative overflow-hidden backdrop-blur-2xl rounded-[32px] p-8 transition-all duration-500 hover:-translate-y-2 ${
    darkMode
      ? "bg-white/[0.08] border border-white/10 hover:shadow-[0_0_50px_rgba(59,130,246,0.25)]"
      : "bg-white/70 border border-[#24B1B1]/20 hover:shadow-[0_0_35px_rgba(0,121,121,0.12)]"
  }`}
>

    {/* Glow */}
    <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
    {/* Icon */}
    <div className="relative w-16 h-16 rounded-2xl bg-blue-500/20 flex items-center justify-center text-3xl mb-6 shadow-[0_0_30px_rgba(59,130,246,0.3)]">
      📂
    </div>

    <h2
  className={`text-3xl font-black mb-4 ${
    darkMode ? "text-white" : "text-[#007979]"
  }`}
>
      Upload Audio
    </h2>

    <p
  className={`leading-7 mb-8 ${
    darkMode ? "text-gray-300" : "text-gray-600"
  }`}
>
      Upload audio files and instantly convert them into accurate AI-powered text.
    </p>

    <div
  className={`border rounded-2xl p-5 backdrop-blur-xl mb-6 transition-all duration-300 ${
    darkMode
      ? "border-dashed border-white/20 bg-white/[0.04] hover:bg-white/[0.06]"
      : "border-[#24B1B1]/20 bg-[#FFF7F0]"
  }`}
>
      <input
  ref={fileInputRef}
  type="file"
  accept="audio/*,.aac"
  onChange={handleFileChange}
        className={`w-full ${
  darkMode ? "text-gray-200" : "text-gray-700"
}`}
      />

    </div>

    <button
  onClick={() => handleUpload()}
  disabled={loading || recording || listening}
      className={`w-full py-4 rounded-2xl font-bold text-lg transition-all duration-300 ${
  loading || recording || listening
  ? "opacity-60 cursor-not-allowed"
  : ""
} ${
  darkMode
    ? "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white hover:shadow-[0_0_35px_rgba(59,130,246,0.45)]"
    : "bg-[#007979] hover:bg-[#24B1B1] text-white"
}`}
    >
      {loading ? "Converting..." : "Convert Audio"}
    </button>

  </div>

  {/* Record Card */}
<div
  className={`group relative overflow-hidden backdrop-blur-2xl rounded-[32px] p-8 transition-all duration-500 hover:-translate-y-2 ${
    darkMode
      ? "bg-white/[0.08] border border-white/10 hover:shadow-[0_0_50px_rgba(34,197,94,0.25)]"
      : "bg-white/70 border border-[#24B1B1]/20 hover:shadow-[0_0_35px_rgba(0,121,121,0.12)]"
  }`}
>

  <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

  <div className="relative w-16 h-16 rounded-2xl bg-green-500/20 flex items-center justify-center text-3xl mb-6 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
    🎙
  </div>

  <h2
    className={`text-3xl font-black mb-4 ${
      darkMode ? "text-white" : "text-[#007979]"
    }`}
  >
    Record Voice
  </h2>

  <p
    className={`leading-7 mb-8 ${
      darkMode ? "text-gray-300" : "text-gray-600"
    }`}
  >
    Record directly from your microphone with crystal-clear voice capture.
  </p>

  {!recording ? (
    <button
  onClick={startRecording}
  disabled={listening || loading}
      className={`w-full py-4 rounded-2xl font-bold text-lg transition-all duration-300 ${
  listening || loading
    ? "opacity-60 cursor-not-allowed"
    : ""
} ${
  darkMode
          ? "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-white hover:shadow-[0_0_35px_rgba(34,197,94,0.45)]"
          : "bg-[#007979] hover:bg-[#24B1B1] text-white"
      }`}
    >
      Start Recording
    </button>
  ) : (
    <button
      onClick={stopRecording}
      className="w-full bg-gradient-to-r from-red-500 to-red-600 py-4 rounded-2xl font-bold text-lg text-white transition-all duration-300 hover:shadow-[0_0_35px_rgba(239,68,68,0.45)]"
    >
      Stop Recording
    </button>
  )}

</div>

  {/* Live Speech */}
<div
  className={`group relative overflow-hidden backdrop-blur-2xl rounded-[32px] p-8 transition-all duration-500 hover:-translate-y-2 ${
    darkMode
      ? "bg-white/[0.08] border border-white/10 hover:shadow-[0_0_50px_rgba(251,191,36,0.25)]"
      : "bg-white/70 border border-[#24B1B1]/20 hover:shadow-[0_0_35px_rgba(0,121,121,0.12)]"
  }`}
>

  <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-amber-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

  <div className="relative w-16 h-16 rounded-2xl bg-amber-400/20 flex items-center justify-center text-3xl mb-6 shadow-[0_0_30px_rgba(251,191,36,0.3)]">
    ⚡
  </div>

  <h2
    className={`text-3xl font-black mb-4 ${
      darkMode ? "text-white" : "text-[#007979]"
    }`}
  >
    Live Speech
  </h2>

  <p
    className={`leading-7 mb-8 ${
      darkMode ? "text-gray-300" : "text-gray-600"
    }`}
  >
    Speak live and generate real-time speech recognition instantly.
  </p>

  <button
  onClick={startLiveSpeech}
  disabled={recording || loading}
    className={`w-full py-4 rounded-2xl font-black text-lg transition-all duration-300 ${
  recording || loading
    ? "opacity-60 cursor-not-allowed"
    : ""
} ${
  darkMode
        ? "bg-gradient-to-r from-amber-400 to-orange-500 hover:from-orange-400 hover:to-amber-300 text-black hover:shadow-[0_0_35px_rgba(251,191,36,0.45)]"
        : "bg-[#007979] hover:bg-[#24B1B1] text-white"
    }`}
  >
    {listening ? "Listening..." : "Start Live Speech"}
  </button>

  {listening && (
    <button
      onClick={stopLiveSpeech}
      className="w-full bg-gradient-to-r from-red-500 to-red-600 py-4 rounded-2xl font-bold text-lg text-white mt-5 transition-all duration-300 hover:shadow-[0_0_35px_rgba(239,68,68,0.45)]"
    >
      Stop Live Speech
    </button>
  )}

</div>

</div>

{transcription && (
  <div
    className={`relative mt-10 max-w-5xl w-full backdrop-blur-2xl rounded-3xl p-8 ${
      darkMode
        ? "bg-white/10 border border-white/10 text-white"
        : "bg-white/80 border border-[#24B1B1]/20 text-[#1E293B]"
    }`}
  >

    <h2
      className={`text-3xl font-bold mb-4 ${
        darkMode ? "text-white" : "text-[#007979]"
      }`}
    >
      📜 Transcription Result
    </h2>

    <button
  onClick={() => copyText(transcription)}
  className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/10 transition-all duration-300"
  title="Copy"
>
  <FiCopy size={18} />
</button>

    <p
      className={`leading-8 text-lg ${
        darkMode ? "text-gray-200" : "text-gray-700"
      }`}
    >
      {transcription}
    </p>

    <div className="mt-6 flex gap-3">
  

  <button
    onClick={resetTranscription}
    className="bg-red-500 hover:bg-red-600 transition-all duration-300 px-5 py-2 rounded-xl text-white font-semibold shadow-lg"
  >
    Reset Result
  </button>
</div>

  </div>
)}
{liveText && (
  <div
    className={`relative mt-10 max-w-5xl w-full backdrop-blur-2xl rounded-3xl p-8 ${
      darkMode
        ? "bg-white/10 border border-amber-400/20 text-white shadow-[0_0_40px_rgba(251,191,36,0.15)]"
        : "bg-white/80 border border-[#24B1B1]/20 text-[#1E293B]"
    }`}
  >

    <h2
      className={`text-3xl font-bold mb-4 ${
        darkMode ? "text-amber-300" : "text-[#007979]"
      }`}
    >
      ⚡ Live Speech Result
    </h2>

    <button
  onClick={() => copyText(liveText)}
  className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/10 transition-all duration-300"
  title="Copy"
>
  <FiCopy size={18} />
</button>

    <p
      className={`leading-8 text-lg ${
        darkMode ? "text-gray-200" : "text-gray-700"
      }`}
    >
      {liveText}
    </p>

    <div className="mt-6 flex gap-3">

  <button
    onClick={resetTranscription}
    className="bg-red-500 hover:bg-red-600 transition-all duration-300 px-5 py-2 rounded-xl text-white font-semibold shadow-lg"
  >
    Reset Result
  </button>
</div>

  </div>
)}

  <div className="grid md:grid-cols-3 gap-5 mt-8 w-full max-w-5xl">

  {/* Card 1 */}
  <div
    className={`backdrop-blur-xl rounded-3xl p-6 hover:scale-105 transition-all duration-500 ${
      darkMode
        ? "bg-white/10 border border-white/10 text-white"
        : "bg-white/80 border border-[#24B1B1]/20 text-[#1E293B]"
    }`}
  >
    <h2
      className={`text-2xl font-bold mb-3 ${
        darkMode ? "text-white" : "text-[#007979]"
      }`}
    >
      ⚡ Fast Processing
    </h2>

    <p
      className={`${
        darkMode ? "text-gray-300" : "text-gray-600"
      }`}
    >
      Convert audio into text within seconds using AI-powered transcription.
    </p>
  </div>

  {/* Card 2 */}
  <div
    className={`backdrop-blur-xl rounded-3xl p-6 hover:scale-105 transition-all duration-500 ${
      darkMode
        ? "bg-white/10 border border-white/10 text-white"
        : "bg-white/80 border border-[#24B1B1]/20 text-[#1E293B]"
    }`}
  >
    <h2
      className={`text-2xl font-bold mb-3 ${
        darkMode ? "text-white" : "text-[#007979]"
      }`}
    >
      🎙 Live Recognition
    </h2>

    <p
      className={`${
        darkMode ? "text-gray-300" : "text-gray-600"
      }`}
    >
      Speak directly into your microphone and get real-time text instantly.
    </p>
  </div>

  {/* Card 3 */}
  <div
    className={`backdrop-blur-xl rounded-3xl p-6 hover:scale-105 transition-all duration-500 ${
      darkMode
        ? "bg-white/10 border border-white/10 text-white"
        : "bg-white/80 border border-[#24B1B1]/20 text-[#1E293B]"
    }`}
  >
    <h2
      className={`text-2xl font-bold mb-3 ${
        darkMode ? "text-white" : "text-[#007979]"
      }`}
    >
      📜 Smart History
    </h2>

    <p
      className={`${
        darkMode ? "text-gray-300" : "text-gray-600"
      }`}
    >
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
    <HistoryCard
  history={history}
  darkMode={darkMode}
  historyLoading={historyLoading}
  handleDeleteHistory={handleDeleteHistory}
  handleClearHistory={handleClearHistory}
/>
    </section>

  </div>
);
}

export default App;