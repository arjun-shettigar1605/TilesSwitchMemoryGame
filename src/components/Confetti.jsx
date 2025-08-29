// src/components/Confetti.jsx
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Confetti = ({ show }) => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (show) {
      const newParticles = [];
      const colors = [
        "#ff6b6b",
        "#4ecdc4",
        "#45b7d1",
        "#f7d794",
        "#ff9ff3",
        "#54a0ff",
        "#5f27cd",
        "#00d2d3",
      ];

      // Generate 50 confetti pieces
      for (let i = 0; i < 50; i++) {
        newParticles.push({
          id: i,
          color: colors[Math.floor(Math.random() * colors.length)],
          x: Math.random() * window.innerWidth,
          y: -10,
          rotation: Math.random() * 360,
          size: Math.random() * 8 + 4,
          delay: Math.random() * 2,
        });
      }
      setParticles(newParticles);
    }
  }, [show]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute"
          style={{
            backgroundColor: particle.color,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.x}px`,
            borderRadius: Math.random() > 0.5 ? "50%" : "0%",
          }}
          initial={{
            y: particle.y,
            rotate: 0,
            opacity: 1,
          }}
          animate={{
            y: window.innerHeight + 100,
            rotate: particle.rotation + 720, // Multiple rotations
            opacity: 0,
            x: particle.x + (Math.random() - 0.5) * 200, // Side drift
          }}
          transition={{
            duration: 4,
            delay: particle.delay,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
};

export default Confetti;
