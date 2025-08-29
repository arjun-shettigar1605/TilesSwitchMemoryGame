// src/components/GameStats.jsx
import { ArrowCounterClockwise } from "phosphor-react";

const GameStats = ({ moves, bestScore, onRestart }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-slate-100 rounded-lg shadow-sm">
      <div className="text-lg">
        <span className="font-bold text-slate-700">Moves:</span>
        <span className="ml-2 font-mono text-indigo-600">
          {Math.floor(moves / 2)}
        </span>
      </div>
      <div className="text-lg">
        <span className="font-bold text-slate-700">Best:</span>
        <span className="ml-2 font-mono text-slate-500">
          {bestScore !== null ? bestScore/2 : "-"}
        </span>
      </div>
      <button
        onClick={onRestart}
        className="p-2 rounded-full text-slate-600 bg-slate-200 hover:bg-indigo-200 hover:text-indigo-700 transition-colors"
        title="Restart Game"
      >
        <ArrowCounterClockwise size={24} weight="bold" />
      </button>
    </div>
  );
};

export default GameStats;
