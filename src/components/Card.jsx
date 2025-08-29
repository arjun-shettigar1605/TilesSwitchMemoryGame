// src/components/Card.jsx
import { motion } from "framer-motion";
import { Diamond } from "phosphor-react";

const Card = ({ card, onClick }) => {
  const isFlipped = card.isFlipped || card.isMatched;

  return (
    <motion.div
      className="aspect-square cursor-pointer"
      onClick={onClick}
      animate={{ rotateY: isFlipped ? 180 : 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Card Back */}
      <div
        className="absolute inset-0 flex items-center justify-center rounded-lg bg-indigo-500 shadow-md transition-shadow hover:shadow-lg hover:shadow-indigo-500/50"
        style={{ backfaceVisibility: "hidden" }}
      >
        <Diamond size={40} weight="bold" className="text-white opacity-40" />
      </div>

      {/* Card Front */}
      <div
        className={`absolute inset-0 flex items-center justify-center rounded-lg shadow-md ${
          card.isMatched ? "bg-green-100" : "bg-slate-100"
        }`}
        style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}
      >
        <card.Icon
          size={52}
          weight="bold"
          className={`${card.isMatched ? "text-green-500" : "text-slate-700"}`}
        />
      </div>
    </motion.div>
  );
};

export default Card;
