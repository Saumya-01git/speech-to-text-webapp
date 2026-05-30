function Navbar({ darkMode, setDarkMode }) {
  return (
    <nav
      className={`w-full fixed top-0 left-0 z-50 backdrop-blur-xl border-b shadow-lg transition-all duration-500 ${
        darkMode
          ? "bg-black/40 border-white/5"
          : "bg-[#FFF0E4]/80 border-[#24B1B1]/20"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <h1
          className={`text-3xl font-bold tracking-wide ${
            darkMode ? "text-white" : "text-[#007979]"
          }`}
        >
          🎤 SpeechAI
        </h1>

        <div className="flex items-center gap-8 text-lg font-medium">

          <a
            href="#home"
            className={`transition-all duration-300 ${
              darkMode
                ? "text-gray-200 hover:text-orange-400"
                : "text-[#007979] hover:text-[#24B1B1]"
            }`}
          >
            Home
          </a>

          <a
            href="#transcribe"
            className={`transition-all duration-300 ${
              darkMode
                ? "text-gray-200 hover:text-orange-400"
                : "text-[#007979] hover:text-[#24B1B1]"
            }`}
          >
            Transcribe
          </a>

          <a
            href="#history"
            className={`transition-all duration-300 ${
              darkMode
                ? "text-gray-200 hover:text-orange-400"
                : "text-[#007979] hover:text-[#24B1B1]"
            }`}
          >
            History
          </a>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`w-12 h-12 rounded-full flex items-center justify-center text-xl transition-all duration-300 ${
              darkMode
                ? "bg-white/10 text-yellow-300 hover:bg-white/20"
                : "bg-[#24B1B1]/10 text-[#007979] hover:bg-[#24B1B1]/20"
            }`}
          >
            {darkMode ? "☀️" : "🌙"}
          </button>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;