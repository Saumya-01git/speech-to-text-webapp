 
function Hero({ darkMode }) {
  return (
    <div
  className={`relative text-center mt-20 mb-4 px-4 py-6 overflow-hidden rounded-[40px] shadow-[0_0_30px_rgba(36,177,177,0.10)] ${
    darkMode
      ? "border border-white/10"
      : "bg-gradient-to-br from-[#FFFFFF] via-[#FFFDF8] to-[#FFF7EF] border border-[#007979]/30"
  }`}
>
      {/* Main Background Glow */}
      
      {/* Center Purple Glow */}
<div className="absolute top-0 left-1/2 -translate-x-1/2 w-[650px] h-[650px] bg-violet-500/15 blur-[160px] rounded-full"></div>

{/* Right Cyan Glow */}
<div className="absolute top-24 right-16 w-96 h-96 bg-cyan-400/12 blur-[170px] rounded-full"></div>

{/* Bottom Blue Glow */}
<div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[450px] h-[450px] bg-blue-500/10 blur-[170px] rounded-full"></div>
      {/* Badge */}
      <div
        className={`relative inline-flex items-center gap-2 px-5 py-2 rounded-full backdrop-blur-xl mb-8 ${
          darkMode
            ? "bg-white/10 border border-white/10 shadow-[0_0_40px_rgba(251,191,36,0.18)]"
            : "bg-white/80 border border-[#24B1B1]/20"
        }`}
      >

        <span className="w-2 h-2 rounded-full bg-orange-400"></span>

        <p
          className={`text-sm tracking-[0.18em] uppercase font-semibold ${
            darkMode ? "text-cyan-300" : "text-[#007979]"
          }`}
        >
          AI Powered Speech Recognition
        </p>

      </div>

      {/* Heading */}
      <h1 className="relative text-5xl md:text-7xl font-black leading-tight tracking-tight">

        <span
          className={`bg-gradient-to-r bg-clip-text text-transparent ${
            darkMode
              ? "from-white via-orange-200 to-amber-400"
              : "from-[#007979] via-[#24B1B1] to-[#0F766E]"
          }`}
        >
          Convert Speech
        </span>

        <br />

        <span
          className={`${
            darkMode ? "text-white" : "text-[#1E293B]"
          }`}
        >
          Into Text Instantly
        </span>

      </h1>

      {/* Description */}
      <p
        className={`relative text-lg md:text-xl max-w-3xl mx-auto mt-5 leading-relaxed ${
          darkMode ? "text-gray-300" : "text-gray-600"
        }`}
      >

        Upload audio files, record voice in real-time,
        or use live speech recognition to generate
        fast and accurate AI-powered transcriptions
        within seconds.

      </p>

      {/* Buttons */}
      <div className="relative flex justify-center gap-5 mt-7 flex-wrap">

        <a
          href="#transcribe"
          className="group relative overflow-hidden bg-gradient-to-r from-amber-400 to-orange-500 hover:from-orange-400 hover:to-amber-300 text-black px-10 py-4 rounded-2xl text-lg font-bold transition-all duration-500 hover:scale-105 shadow-[0_0_45px_rgba(251,191,36,0.35)]"
        >

          <span className="relative z-10">
            🚀 Start Transcribing
          </span>

          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-white/20 transition-all duration-500"></div>

        </a>

        <a
          href="#history"
          className={`transition-all duration-300 px-10 py-4 rounded-2xl text-lg font-semibold backdrop-blur-xl hover:scale-105 ${
            darkMode
              ? "border border-white/10 hover:border-orange-400 text-white bg-white/5 hover:bg-white/10"
              : "border border-[#24B1B1]/20 text-[#007979] bg-white/80 hover:bg-[#FFF7F0]"
          }`}
        >
          📜 View History
        </a>

      </div>

      {/* Mic Section */}
      <div className="relative mt-6 flex justify-center">

        <div className="relative flex items-center justify-center">

          {/* Outer Ring */}
          <div className="absolute w-40 h-40 border border-orange-400/20 rounded-full animate-ping"></div>

          {/* Glow */}
          <div className="absolute w-36 h-36 bg-cyan-400/20 blur-3xl rounded-full"></div>

          {/* Mic */}
          <div className="relative text-6xl md:text-7xl drop-shadow-[0_0_40px_rgba(251,191,36,0.55)] animate-[float_4s_ease-in-out_infinite]">
            🎙️
          </div>

        </div>

      </div>

      {/* Stats Cards */}
      <div className="relative mt-5 flex justify-center flex-wrap gap-4">

        {/* Card 1 */}
        <div
          className={`group backdrop-blur-xl px-6 py-3 rounded-3xl transition-all duration-500 hover:-translate-y-2 ${
            darkMode
              ? "bg-white/5 border border-white/10 hover:border-orange-400/40 hover:shadow-[0_0_40px_rgba(251,191,36,0.18)]"
              : "bg-white/80 border border-[#24B1B1]/20"
          }`}
        >

          <h2
            className={`text-lg font-semibold tracking-wide mb-1 ${
              darkMode ? "text-white" : "text-[#007979]"
            }`}
          >
            🧠 AI-Powered
          </h2>

          <p
            className={`text-xs tracking-wide ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Advanced Speech Recognition
          </p>

        </div>

        {/* Card 2 */}
        <div
          className={`group backdrop-blur-xl px-6 py-3 rounded-3xl transition-all duration-500 hover:-translate-y-2 ${
            darkMode
              ? "bg-white/5 border border-white/10 hover:border-orange-400/40 hover:shadow-[0_0_40px_rgba(251,191,36,0.18)]"
              : "bg-white/80 border border-[#24B1B1]/20"
          }`}
        >

          <h2
            className={`text-lg font-semibold tracking-wide mb-1 ${
              darkMode ? "text-white" : "text-[#007979]"
            }`}
          >
            ⚡ Real-Time
          </h2>

          <p
            className={`text-xs tracking-wide ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Instant Text Generation
          </p>

        </div>

        {/* Card 3 */}
        <div
          className={`group backdrop-blur-xl px-6 py-3 rounded-3xl transition-all duration-500 hover:-translate-y-2 ${
            darkMode
              ? "bg-white/5 border border-white/10 hover:border-orange-400/40 hover:shadow-[0_0_40px_rgba(251,191,36,0.18)]"
              : "bg-white/80 border border-[#24B1B1]/20"
          }`}
        >

          <h2
            className={`text-lg font-semibold tracking-wide mb-1 ${
              darkMode ? "text-white" : "text-[#007979]"
            }`}
          >
            📂 History
          </h2>

          <p
            className={`text-xs tracking-wide ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Manage Past Transcripts
          </p>

        </div>

      </div>

    </div>
  );
}

export default Hero;
 