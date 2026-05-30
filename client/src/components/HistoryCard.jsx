function HistoryCard({
  history,
  darkMode,
  handleDeleteHistory,
  handleClearHistory,
}) {
  return (
    <div className="w-full max-w-5xl px-4 py-20">
      <div className="text-center mb-10">
        <h1
          className={`text-5xl font-extrabold mb-4 ${
            darkMode ? "text-white" : "text-[#007979]"
          }`}
        >
          📜 Transcription History
        </h1>

        <p className={darkMode ? "text-gray-300 text-lg" : "text-gray-600 text-lg"}>
          View all your previous speech-to-text results
        </p>

        <div className="mt-5 flex justify-center">
          <button
  type="button"
  onClick={() => {
    console.log("Clear All clicked");
    handleClearHistory();
  }}
  className="relative z-50 bg-red-500 hover:bg-red-700 transition-all duration-300 px-6 py-3 rounded-2xl text-white font-semibold shadow-lg cursor-pointer"
>
  🧹 Clear All History
</button>
        </div>
      </div>

      {history.length > 0 ? (
        <div className="grid gap-6">
          {history.map((item, index) => (
            <div
              key={item._id}
              className={`backdrop-blur-xl rounded-3xl p-6 shadow-xl hover:scale-[1.02] transition-all duration-300 ${
                darkMode
                  ? "bg-white/10 border border-white/20"
                  : "bg-white/80 border border-[#24B1B1]/20"
              }`}
            >
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-orange-400 font-semibold text-sm">
                    AUDIO FILE
                  </p>

                  <h2
                    className={`text-2xl font-bold ${
                      darkMode ? "text-white" : "text-[#1E293B]"
                    }`}
                  >
                    {item.fileName}
                  </h2>
                </div>

                <div className="bg-orange-500/20 px-4 py-2 rounded-xl border border-orange-400/30">
                  <p className="text-orange-500 text-sm font-semibold">
                    #{index + 1}
                  </p>
                </div>
              </div>

              <div
                className={`rounded-2xl p-5 ${
                  darkMode
                    ? "bg-black/20 border border-white/10"
                    : "bg-[#FFF7F0] border border-[#24B1B1]/20"
                }`}
              >
                <p
                  className={`leading-relaxed text-lg ${
                    darkMode ? "text-gray-200" : "text-gray-700"
                  }`}
                >
                  {item.text}
                </p>
              </div>

              <div className="mt-5 flex justify-end">
                <button
  onClick={() => handleDeleteHistory(item._id)}
  className="bg-red-500 hover:bg-red-600 transition-all duration-300 px-5 py-2 rounded-xl text-white font-semibold shadow-lg"
>
                  🗑 Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div
          className={`backdrop-blur-xl rounded-3xl p-10 text-center shadow-xl ${
            darkMode
              ? "bg-white/10 border border-white/20"
              : "bg-white/80 border border-[#24B1B1]/20"
          }`}
        >
          <h2
            className={`text-3xl font-bold mb-4 ${
              darkMode ? "text-white" : "text-[#007979]"
            }`}
          >
            No History Yet
          </h2>

          <p className={darkMode ? "text-gray-300 text-lg" : "text-gray-600 text-lg"}>
            Your transcriptions will appear here after conversion.
          </p>
        </div>
      )}
    </div>
  );
}

export default HistoryCard;