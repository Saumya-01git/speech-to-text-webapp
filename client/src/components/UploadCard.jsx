function UploadCard({
  file,
  handleFileChange,
  handleUpload,
  loading,
  recording,
  startRecording,
  stopRecording,
  listening,
  startLiveSpeech,
  stopLiveSpeech,
  message,
  liveText,
  transcription,
}) {
  return (
    <div className="relative overflow-hidden backdrop-blur-2xl bg-white/10 border border-white/10 p-8 rounded-[32px] w-full max-w-md text-center shadow-[0_0_80px_rgba(251,191,36,0.15)] text-white">

      {/* Glow Effects */}
      <div className="absolute -top-24 -right-24 w-52 h-52 bg-amber-400/20 blur-3xl rounded-full"></div>

      <div className="absolute -bottom-24 -left-24 w-52 h-52 bg-blue-500/20 blur-3xl rounded-full"></div>

      {/* Heading */}
      <h1 className="relative mb-3 text-white text-3xl font-extrabold tracking-wide">
        🎤 Speech To Text
      </h1>

      <p className="relative text-gray-300 mb-8 text-lg">
        Upload, record, or use live speech recognition
        to instantly generate accurate transcriptions.
      </p>

      {/* Upload Box */}
      <div className="relative border-2 border-dashed border-white/20 rounded-3xl p-5 mb-6 bg-white/5 hover:bg-white/10 transition-all duration-300 hover:border-amber-300/40">

        <div className="text-5xl mb-3">
          ☁️
        </div>

        <p className="text-gray-200 mb-4 font-medium">
          Drag & Drop audio or choose file
        </p>

        <input
          type="file"
          onChange={handleFileChange}
          className="w-full cursor-pointer text-sm text-gray-200"
        />

      </div>

      {/* Selected File */}
      {file && (
        <div className="bg-black/20 border border-white/10 rounded-2xl p-3 mb-5">
          <p className="text-green-300 font-semibold">
            ✅ Selected: {file.name}
          </p>
        </div>
      )}

      {/* Convert Button */}
      <button
        onClick={() => handleUpload()}
        className="bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 hover:shadow-[0_0_30px_rgba(251,191,36,0.45)] transition-all duration-300 hover:scale-[1.02] text-black py-3 px-6 rounded-2xl cursor-pointer text-base w-full mb-4 font-bold"
      >
        {loading ? "⏳ Converting..." : "⚡ Convert To Text"}
      </button>

      {/* Recording Button */}
      {!recording ? (
        <button
          onClick={startRecording}
          className="bg-green-600 hover:bg-green-700 hover:shadow-[0_0_25px_rgba(34,197,94,0.5)] transition-all duration-300 hover:scale-[1.02] text-white py-3 px-6 rounded-2xl cursor-pointer text-base w-full font-semibold"
        >
          🎙 Start Recording
        </button>
      ) : (
        <button
          onClick={stopRecording}
          className="bg-red-600 hover:bg-red-700 hover:shadow-[0_0_25px_rgba(239,68,68,0.5)] transition-all duration-300 hover:scale-[1.02] text-white py-3 px-6 rounded-2xl cursor-pointer text-base w-full font-semibold animate-pulse"
        >
          ⏹ Stop Recording
        </button>
      )}

      {/* Live Speech Button */}
      <button
        onClick={startLiveSpeech}
        className="bg-blue-500 hover:bg-blue-600 hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] transition-all duration-300 hover:scale-[1.02] text-white py-3 px-6 rounded-2xl cursor-pointer text-base w-full mt-4 font-semibold"
      >
        {listening
          ? "🎤 Listening... Speak now"
          : "⚡ Start Live Speech"}
      </button>

      {/* Stop Live Speech */}
      {listening && (
        <button
          onClick={stopLiveSpeech}
          className="bg-red-600 hover:bg-red-700 hover:shadow-[0_0_25px_rgba(239,68,68,0.5)] transition-all duration-300 hover:scale-[1.02] text-white py-3 px-6 rounded-2xl cursor-pointer text-base w-full mt-3 font-semibold"
        >
          🛑 Stop Live Speech
        </button>
      )}

      {/* Message */}
      {message && (
        <div className="mt-5 bg-black/20 border border-white/10 rounded-2xl p-3">
          <p className="font-semibold text-amber-200">
            {message}
          </p>
        </div>
      )}

      {/* Live Speech Output */}
      {liveText && (
        <div className="mt-6 p-5 bg-yellow-100 rounded-2xl text-left text-black shadow-lg">

          <h3 className="font-bold mb-3 text-lg">
            🎤 Live Speech
          </h3>

          <p className="leading-7">
            {liveText}
          </p>

        </div>
      )}

      {/* Final Transcription */}
      {transcription && (
        <div className="mt-6 p-5 bg-white rounded-2xl text-left text-black shadow-lg">

          <h3 className="font-bold mb-3 text-lg">
            📄 Transcription
          </h3>

          <p className="leading-7">
            {transcription}
          </p>

        </div>
      )}
    </div>
  );
}

export default UploadCard;