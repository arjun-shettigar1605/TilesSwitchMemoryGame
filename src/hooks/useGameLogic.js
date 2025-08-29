// src/hooks/useGameLogic.js
import { useState, useEffect, useCallback } from "react";
import { ICONS } from "../constants/cards";

const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

const useGameLogic = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameState, setGameState] = useState("playing"); // 'playing', 'won'
  const [bestScore, setBestScore] = useState(null); // Track best score for current session only
  const [showConfetti, setShowConfetti] = useState(false); // New state for confetti

  const initializeGame = useCallback(() => {
    const duplicatedIcons = [...ICONS, ...ICONS];
    const shuffled = shuffleArray(duplicatedIcons).map((card, index) => ({
      ...card,
      id: index,
      isFlipped: false,
      isMatched: false,
    }));
    setCards(shuffled);
    setFlippedCards([]);
    setMatchedPairs([]);
    setMoves(0);
    setGameState("playing");
  }, []); // Removed ICONS dependency to prevent re-initialization

  // Initialize game only once when component mounts
  useEffect(() => {
    initializeGame();
  }, []); // Empty dependency array to run only once

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstCardIndex, secondCardIndex] = flippedCards;
      const firstCard = cards[firstCardIndex];
      const secondCard = cards[secondCardIndex];

      if (firstCard.symbol === secondCard.symbol) {
        // It's a match!
        setMatchedPairs((prev) => [...prev, firstCard.symbol]);
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.symbol === firstCard.symbol
              ? { ...card, isMatched: true }
              : card
          )
        );
      }

      // Flip cards back after a short delay (only non-matched cards)
      const timeoutId = setTimeout(() => {
        setCards((prevCards) =>
          prevCards.map((card, index) => {
            // If it's one of the flipped cards and it's not matched, flip it back
            if (
              (index === firstCardIndex || index === secondCardIndex) &&
              !card.isMatched
            ) {
              return { ...card, isFlipped: false };
            }
            return card;
          })
        );
        setFlippedCards([]);
      }, 800);

      return () => clearTimeout(timeoutId);
    }
  }, [flippedCards.length]); // Only depend on flippedCards length, not the entire cards array

  // Check win condition: all 8 pairs must be matched
  useEffect(() => {
    // Only check for win when we actually have matched pairs and all 8 pairs are matched
    if (matchedPairs.length === ICONS.length && gameState === "playing") {
      setGameState("won");
      // Update best score only if this is the first game or current score is better
      if (bestScore === null || moves < bestScore) {
        setBestScore(moves);
        setShowConfetti(true); // Trigger confetti for new best score
        // Hide confetti after animation
        setTimeout(() => setShowConfetti(false), 4000);
      }
    }
  }, [matchedPairs.length, moves, bestScore, gameState]);

  const handleCardClick = (clickedIndex) => {
    if (
      flippedCards.length === 2 ||
      cards[clickedIndex].isFlipped ||
      cards[clickedIndex].isMatched ||
      gameState === "won"
    ) {
      return; // Prevent clicking more than 2 cards or already matched cards or when game is won
    }

    setMoves((prev) => prev + 1);

    setCards((prevCards) =>
      prevCards.map((card, index) =>
        index === clickedIndex ? { ...card, isFlipped: true } : card
      )
    );

    setFlippedCards((prev) => [...prev, clickedIndex]);
  };

  const restartGame = () => {
    initializeGame();
  };

  return {
    cards,
    moves,
    bestScore,
    gameState,
    handleCardClick,
    restartGame,
    showConfetti,
  };
};

export default useGameLogic;
