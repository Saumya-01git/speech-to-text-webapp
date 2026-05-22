function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">

      <h1 className="text-5xl font-bold mb-8">
        Speech To Text Web App
      </h1>

      <p className="mb-6 text-gray-300">
        Upload or record audio and convert it into text
      </p>

      <input
        type="file"
        accept="audio/*"
        className="mb-4 border border-gray-500 p-2 rounded-lg"
      />

      <button className="bg-blue-500 px-6 py-2 rounded-lg hover:bg-blue-600">
        Upload Audio
      </button>

    </div>
  )
}

export default App