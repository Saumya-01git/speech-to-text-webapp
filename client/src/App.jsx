function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">

      <h1 className="text-4xl font-bold mb-8">
        Speech To Text Web App
      </h1>

      <input
        type="file"
        accept="audio/*"
        className="mb-4"
      />

      <button className="bg-blue-500 px-6 py-2 rounded-lg">
        Upload Audio
      </button>

    </div>
  )
}

export default App