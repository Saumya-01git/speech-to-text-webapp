function Hero() {
  return (
    <div className="text-center mt-32 mb-16 px-4">

      <div className="inline-block px-4 py-2 rounded-full bg-orange-500/20 border border-orange-400/30 mb-6 backdrop-blur-md">
        <p className="text-orange-300 text-sm tracking-wide font-medium">
          AI Powered Speech Recognition
        </p>
      </div>

      <h1 className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-white via-amber-200 to-orange-400 bg-clip-text text-transparent leading-tight">

        Convert <span className="text-orange-400">Speech</span>
        <br />
        Into Text Instantly

      </h1>

      <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mt-6 leading-relaxed">

        Upload audio files, record voice in real-time,
        or use live speech recognition to generate
        accurate AI-powered transcriptions within seconds.

      </p>

      <div className="flex justify-center gap-4 mt-10 flex-wrap">

        <a
          href="#transcribe"
          className="bg-amber-400 hover:bg-amber-500 text-black transition-all duration-300 px-8 py-4 rounded-2xl text-lg font-semibold shadow-lg"
        >
          🚀 Start Transcribing
        </a>

        <a
          href="#history"
          className="border border-white/20 hover:border-orange-400 transition-all duration-300 px-8 py-4 rounded-2xl text-lg font-semibold backdrop-blur-md bg-white/10"
        >
          📜 View History
        </a>

      </div>

      <div className="mt-16 flex justify-center">

        <div className="relative">

          <div className="absolute inset-0 bg-orange-500 blur-3xl opacity-30 rounded-full"></div>

          <div className="relative text-8xl animate-pulse">
            🎙️
          </div>

        </div>

      </div>

    </div>
  );
}

export default Hero;