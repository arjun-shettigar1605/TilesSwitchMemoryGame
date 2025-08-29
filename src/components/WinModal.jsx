// src/components/WinModal.jsx
import { motion } from "framer-motion";

const WinModal = ({ moves, onRestart }) => {
  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/60">
      <motion.div
        className="p-8 bg-white rounded-xl shadow-2xl text-center"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <h2 className="text-3xl font-bold text-green-600">You Won!</h2>
        <p className="mt-2 text-lg text-slate-600">
          You completed the game in{" "}
          <span className="font-bold text-indigo-600">{moves / 2}</span> moves.
        </p>
        <button
          onClick={onRestart}
          className="mt-6 px-6 py-2 text-lg font-semibold text-white bg-indigo-500 rounded-lg shadow-md hover:bg-indigo-600 transition-colors"
        >
          Play Again
        </button>
      </motion.div>
    </div>
  );
};

export default WinModal;
