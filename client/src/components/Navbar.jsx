function Navbar() {
  return (
    <nav className="w-full fixed top-0 left-0 z-50 backdrop-blur-xl bg-black/40 border-b border-white/5 shadow-lg">

      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <h1 className="text-3xl font-bold text-white tracking-wide">
          🎤 SpeechAI
        </h1>

        <div className="flex gap-8 text-lg font-medium">

          <a
            href="#home"
            className="text-gray-200 hover:text-orange-400 transition-all duration-300"
          >
            Home
          </a>

          <a
            href="#transcribe"
            className="text-gray-200 hover:text-orange-400 transition-all duration-300"
          >
            Transcribe
          </a>

          <a
            href="#history"
            className="text-gray-200 hover:text-orange-400 transition-all duration-300"
          >
            History
          </a>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;