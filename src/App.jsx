// src/App.jsx
import Board from "./components/Board";

function App() {
  return (
    <main className="min-h-screen bg-slate-800 flex flex-col items-center justify-center p-4 font-sans">
      <div className="text-center mb-6">
        <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-wider">
          MemoGlyph
        </h1>
        <p className="text-indigo-300 mt-1">Match all the pairs to win!</p>
      </div>
      <Board />
    </main>
  );
}

export default App;
