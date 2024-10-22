import { motion } from "framer-motion";
import Card from "./Card";
import styles from "../styles/PlayerHand.module.css";

const PlayerHand = ({ player, isCurrentPlayer, onPlayCard }) => {
  // Framer Motion variants for throwing cards with faster and cooler effects
  const cardThrowEffect = {
    hidden: { opacity: 0, x: -100, y: -50, rotate: -10, scale: 0.8 }, // Start with slight rotation and scale down
    visible: (index) => ({
      opacity: 1,
      x: 0,
      y: 0,
      rotate: 0,
      scale: 1, // Cards scale up slightly as they are dealt
      transition: {
        delay: index * 0.1, // Faster delay between cards
        type: "spring",
        stiffness: 500, // Snappy feel
        damping: 15, // Reduced bounce
      },
    }),
  };

  // Dynamic fanned-out card effect based on number of cards
  const fanCardEffect = (cardCount) => {
    const spreadAngle = 20; // Increase the spread angle for wider fan
    const offsetX = 12; // Adjust horizontal translation for proper alignment
    return Array.from({ length: Math.min(cardCount, 5) }).map((_, index) => ({
      rotate: (index - (cardCount - 1) / 2) * spreadAngle, // More horizontal spread
      x: (index - (cardCount - 1) / 2) * offsetX, // Horizontal spacing for fan effect
      y: -10, // Slight upward movement for alignment
    }));
  };

  return (
    <div className={styles.playerHandContainer}>
      {/* Player Name */}
      <div className={styles.playerName}>{player.name}</div>

      {/* Player Hand Row (Profile Picture + Cards) */}
      <div className={styles.playerHandRow}>
        {/* Profile Picture */}
        <img
          className={styles.profilePic}
          src={player.profilePic}
          alt={`${player?.name}'s profile`}
        />

        {/* Cards: Show actual cards for current player, and fanned out effect for others */}
        {isCurrentPlayer ? (
          <div className={`${styles.cards} flex items-center`}>
            {player.hand.map((card, index) => (
              <motion.div
                key={index}
                className={styles.card}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={cardThrowEffect} // Add the enhanced throwing effect here
                onClick={() => onPlayCard(card)}
              >
                <Card suit={card.suit} value={card.value} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="relative flex items-center justify-center ml-[70px]">
            {" "}
            {/* Flex center the fanned cards */}
            {fanCardEffect(player.hand.length).map((effect, index) => (
              <motion.div
                key={index}
                className="absolute w-[60px] h-[90px] bg-gray-200 border border-gray-400 rounded-lg shadow-sm"
                style={{
                  transform: `rotate(${effect.rotate}deg) translate(${effect.x}px, ${effect.y}px)`,
                }}
              >
                {/* The last card will show the 'ad' */}
                <Card
                  isAdCard={
                    index === player.hand.length - 1 && player.hand.length > 1
                  }
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayerHand;
