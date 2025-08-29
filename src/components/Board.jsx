// src/components/Board.jsx
import useGameLogic from "../hooks/useGameLogic";
import Card from "./Card";
import GameStats from "./GameStats";
import WinModal from "./WinModal";
import Confetti from "./Confetti";

const Board = () => {
  const {
    cards,
    moves,
    bestScore,
    gameState,
    handleCardClick,
    restartGame,
    showConfetti,
  } = useGameLogic();

  return (
    <div className="relative w-full max-w-xl mx-auto space-y-4">
      {/* Confetti Animation */}
      <Confetti show={showConfetti} />

      {/* Game content */}
      <GameStats moves={moves} bestScore={bestScore} onRestart={restartGame} />
      <div className="grid grid-cols-4 gap-3 sm:gap-4">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            onClick={() => handleCardClick(card.id)}
          />
        ))}
      </div>
      {gameState === "won" && (
        <WinModal moves={moves} onRestart={restartGame} />
      )}
    </div>
  );
};

export default Board;
