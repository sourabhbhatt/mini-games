import { useSelector, useDispatch } from "react-redux";
import PlayerHand from "./PlayerHand";
import { playCard, nextTurn, resetWinner } from "../redux/slices/gameSlice";
import Card from "./Card";
import Scoreboard from "../components/ScoreBoard";
import styles from "../styles/GameBoard.module.css";
import { motion } from "framer-motion";

const GameBoard = () => {
  const dispatch = useDispatch();
  const { teams, turn, currentTrick, winningPlayerId } = useSelector(
    (state) => state.game
  );

  const handlePlayCard = (card, playerId) => {
    dispatch(playCard({ playerId, card }));
    dispatch(nextTurn());
    const ClickSound = new Audio("./audio/card-flip-1.mp3");
    ClickSound.play();
  };

  // Find the current players based on turn order
  const currentPlayer = (team, playerIndex) =>
    turn === team.players[playerIndex].id;

  // Reset winner if there was one and we're starting a new trick
  if (winningPlayerId && currentTrick.length === 0) {
    setTimeout(() => dispatch(resetWinner()), 2000); // Delay clearing the winner to give visual feedback
  }

  return (
    <div className="p-4 cursor-pointer flex justify-center">
      <div
        className={`grid grid-rows-3 grid-cols-3 h-full w-full justify-items-center  items-center rounded-[15px] shadow-[0_0_15px_rgba(0,0,0,0.5)] md:grid-cols-3 md:grid-rows-3 md:h-[80vh] md:w-[90vw] relative ${styles.board}`}
      >
        <Scoreboard team={"A"} />
        <Scoreboard team={"B"} />
        {/* Bottom Player (Player 1 from Team A) */}
        <div className="row-start-3 col-start-2 flex flex-col items-center justify-center">
          <PlayerHand
            player={teams.teamA.players[0]} // Player 1 from Team A
            isCurrentPlayer={currentPlayer(teams.teamA, 0)}
            onPlayCard={(card) =>
              handlePlayCard(card, teams.teamA.players[0].id)
            }
            isWinner={winningPlayerId === teams.teamA.players[0].id}
          />
        </div>

        {/* Right Player (Player 2 from Team B) */}
        <div className="row-start-2 col-start-3 flex flex-col items-center justify-center">
          <PlayerHand
            player={teams.teamB.players[0]} // Player 2 from Team B
            isCurrentPlayer={currentPlayer(teams.teamB, 0)}
            onPlayCard={(card) =>
              handlePlayCard(card, teams.teamB.players[0].id)
            }
            isWinner={winningPlayerId === teams.teamB.players[0].id}
          />
        </div>

        {/* Center Area (the playing board itself) */}
        <div className="relative row-start-2 col-start-2 w-[150px] h-[150px] flex justify-center items-center shadow-inner shadow-[inset_0_0_10px_rgba(255,255,255,0.1)] md:w-[225px] md:h-[225px]">
          <div className="relative w-full h-full">
            {currentTrick.map((card, index) => {
              // All cards will be positioned in the center
              const topPosition = `30%`;
              const leftPosition = `50%`;

              // Larger random rotation for a messier pile look
              const randomRotation = Math.random() * 30 - 15; // Between -15 to 15 degrees

              // Air effect: movement and rotation to simulate the card landing with more rotation
              const airEffect = {
                x: Math.random() * 40 - 20, // Random horizontal movement (larger range)
                y: Math.random() * 40 - 20, // Random vertical movement (larger range)
                rotate: randomRotation + 15, // Add extra rotation for the "air" effect
              };

              return (
                <motion.div
                  key={index}
                  className="absolute w-[65px] h-[100px] bg-white border-2 border-[#f2b01e] rounded-lg flex justify-center items-center shadow-lg"
                  style={{
                    top: topPosition,
                    left: leftPosition,
                    zIndex: index + 1, // Ensures the most recent card is on top
                    transform: `translate(-50%, -50%) rotate(${randomRotation}deg)`, // Position and rotation
                  }}
                  // Framer Motion animation for the air effect and card throw
                  initial={{ scale: 0, opacity: 0, ...airEffect }}
                  animate={{
                    scale: 1,
                    opacity: 1,
                    x: 0,
                    y: 0,
                    rotate: randomRotation,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                    delay: 0.2,
                  }}
                >
                  <Card suit={card.suit} value={card.value} />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Top Player (Player 3 from Team A) */}
        <div className="row-start-1 col-start-2 flex flex-col items-center justify-center">
          <PlayerHand
            player={teams.teamA.players[1]} // Player 3 from Team A
            isCurrentPlayer={currentPlayer(teams.teamA, 1)}
            onPlayCard={(card) =>
              handlePlayCard(card, teams.teamA.players[1].id)
            }
            isWinner={winningPlayerId === teams.teamA.players[1].id}
          />
        </div>

        {/* Left Player (Player 4 from Team B) */}
        <div className="row-start-2 col-start-1 flex flex-col items-center justify-center">
          <PlayerHand
            player={teams.teamB.players[1]} // Player 4 from Team B
            isCurrentPlayer={currentPlayer(teams.teamB, 1)}
            onPlayCard={(card) =>
              handlePlayCard(card, teams.teamB.players[1].id)
            }
            isWinner={winningPlayerId === teams.teamB.players[1].id}
          />
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
