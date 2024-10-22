import { motion } from "framer-motion";
import Card from "./Card";
import { useDispatch, useSelector } from "react-redux";
import { nextTurn, playCard, announceTrump } from "../redux/slices/gameSlice";

const PlayerHand = ({ player, isCurrentPlayer }) => {
  const dispatch = useDispatch();
  const { currentSuit, trumpSuit } = useSelector((state) => state.game);

  const cardThrowEffect = {
    hidden: { opacity: 0, x: -100, y: -50, rotate: -10, scale: 0.8 },
    visible: (index) => ({
      opacity: 1,
      x: 0,
      y: 0,
      rotate: 0,
      scale: 1,
      transition: {
        delay: index * 0.1,
        type: "spring",
        stiffness: 500,
        damping: 15,
      },
    }),
  };

  const fanCardEffect = (cardCount) => {
    const spreadAngle = 20;
    const offsetX = 12;
    return Array.from({ length: Math.min(cardCount, 5) }).map((_, index) => ({
      rotate: (index - (cardCount - 1) / 2) * spreadAngle,
      x: (index - (cardCount - 1) / 2) * offsetX,
      y: -10,
    }));
  };

  const hasMatchingSuit = player.hand.some((card) => card.suit === currentSuit);

  const handlePlayCard = (card) => {
    if (isCurrentPlayer) {
      if (currentSuit && card.suit !== currentSuit && !trumpSuit) {
        dispatch(announceTrump(card.suit));
      }

      dispatch(playCard({ playerId: player.id, card }));
      dispatch(nextTurn());
    }
  };

  return (
    <div className="flex flex-col justify-center items-center my-5">
      <div className="text-lg font-bold mb-2">{player.name}</div>

      <div className="flex justify-center items-center">
        <img
          className="w-20 h-20 rounded-full border-4 border-white shadow-md mr-4"
          src={player.profilePic}
          alt={`${player?.name}'s profile`}
        />

        {isCurrentPlayer ? (
          <div className="relative flex items-center">
            {player.hand.map((card, index) => {
              const isDisabled =
                currentSuit && card.suit !== currentSuit && hasMatchingSuit;

              return (
                <motion.div
                  key={index}
                  className={`absolute border-2 border-yellow-500 rounded-lg bg-yellow-100 w-16 h-24 ${
                    isDisabled ? "opacity-10 cursor-not-allowed" : ""
                  }`}
                  style={{ left: `${index * 25}px` }}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  variants={cardThrowEffect}
                  onClick={() => !isDisabled && handlePlayCard(card)}
                >
                  <Card
                    disabled={isDisabled}
                    suit={card.suit}
                    value={card.value}
                  />
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="relative flex items-center justify-center ml-[70px]">
            {fanCardEffect(player.hand.length).map((effect, index) => (
              <motion.div
                key={index}
                className="absolute w-[60px] h-[90px] bg-gray-200 border border-gray-400 rounded-lg shadow-sm"
                style={{
                  transform: `rotate(${effect.rotate}deg) translate(${effect.x}px, ${effect.y}px)`,
                }}
              >
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
