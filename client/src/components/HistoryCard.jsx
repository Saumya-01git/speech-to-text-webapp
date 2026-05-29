function HistoryCard({ history }) {
  return (
    <div className="w-full max-w-5xl px-4 py-20">

      <div className="text-center mb-10">

        <h1 className="text-5xl font-extrabold text-white mb-4">
          📜 Transcription History
        </h1>

        <p className="text-gray-300 text-lg">
          View all your previous speech-to-text results
        </p>
        <div className="mt-5 flex justify-center">
        <button
            className="bg-red-500 hover:bg-red-600 transition-all duration-300 px-6 py-3 rounded-2xl text-white font-semibold shadow-lg"
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
              className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-6 shadow-2xl hover:scale-[1.02] transition-all duration-300"
            >

              <div className="flex justify-between items-center mb-4">

                <div>

                  <p className="text-orange-300 font-semibold text-sm">
                    AUDIO FILE
                  </p>

                  <h2 className="text-2xl font-bold text-white">
                    {item.fileName}
                  </h2>

                </div>

                <div className="bg-orange-500/20 px-4 py-2 rounded-xl border border-orange-400/30">

                  <p className="text-orange-200 text-sm font-semibold">
                    #{index + 1}
                  </p>

                </div>

              </div>

              <div className="bg-black/20 border border-white/10 rounded-2xl p-5">

                <p className="text-gray-200 leading-relaxed text-lg">
                  {item.text}
                </p>

              </div>

              <div className="mt-5 flex justify-end">

                <button
                  className="bg-red-500 hover:bg-red-600 transition-all duration-300 px-5 py-2 rounded-xl text-white font-semibold shadow-lg"
                >
                  🗑 Delete
                </button>

              </div>

            </div>

          ))}

        </div>

      ) : (

        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-10 text-center shadow-2xl">

          <h2 className="text-3xl font-bold text-white mb-4">
            No History Yet
          </h2>

          <p className="text-gray-300 text-lg">
            Your transcriptions will appear here after conversion.
          </p>

        </div>

      )}

    </div>
  );
}

export default HistoryCard;