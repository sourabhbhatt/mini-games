import {
  resetWinner,
  shuffleAndDealCards,
  selectDealer,
} from "../redux/slices/gameSlice";
import Card from "./Card";
import { useEffect } from "react";
import PlayerHand from "./PlayerHand";
import { motion } from "framer-motion";
import Scoreboard from "../components/ScoreBoard";
import styles from "../styles/GameBoard.module.css";
import { useSelector, useDispatch } from "react-redux";
import DiscardPile from "./DiscardPile";

const GameBoard = () => {
  const dispatch = useDispatch();
  const { teams, turn, currentTrick, winningPlayerId, trumpSuit } = useSelector(
    (state) => state.game
  );

  useEffect(() => {
    dispatch(shuffleAndDealCards());
    dispatch(selectDealer());
  }, [dispatch]);

  const currentPlayer = (team, playerIndex) =>
    turn === team.players[playerIndex].id;

  if (winningPlayerId && currentTrick.length === 0) {
    setTimeout(() => dispatch(resetWinner()), 2000);
  }

  return (
    <div className="p-4 cursor-pointer flex justify-center">
      <div
        className={`grid grid-rows-3 grid-cols-3 h-full w-full justify-items-center  items-center rounded-[15px] shadow-[0_0_15px_rgba(0,0,0,0.5)] md:grid-cols-3 md:grid-rows-3 md:h-[80vh] md:w-[90vw] relative ${styles.board}`}
      >
        <Scoreboard team={"A"} />
        <Scoreboard team={"B"} />
        <div className="row-start-3 col-start-2 flex flex-col items-center justify-center">
          <PlayerHand
            player={teams.teamA.players[0]} // Player 1 from Team A
            isCurrentPlayer={currentPlayer(teams.teamA, 0)}
            isWinner={winningPlayerId === teams.teamA.players[0].id}
          />
        </div>

        <div className="row-start-2 col-start-3 flex flex-col items-center justify-center">
          <PlayerHand
            player={teams.teamB.players[0]} // Player 2 from Team B
            isCurrentPlayer={currentPlayer(teams.teamB, 0)}
            isWinner={winningPlayerId === teams.teamB.players[0].id}
          />
        </div>

        <DiscardPile currentTrick={currentTrick} />

        <div className="row-start-1 col-start-2 flex flex-col items-center justify-center">
          <PlayerHand
            player={teams.teamA.players[1]} // Player 3 from Team A
            isCurrentPlayer={currentPlayer(teams.teamA, 1)}
            isWinner={winningPlayerId === teams.teamA.players[1].id}
          />
        </div>

        <div className="row-start-2 col-start-1 flex flex-col items-center justify-center">
          <PlayerHand
            player={teams.teamB.players[1]} // Player 4 from Team B
            isCurrentPlayer={currentPlayer(teams.teamB, 1)}
            isWinner={winningPlayerId === teams.teamB.players[1].id}
          />
        </div>
        {trumpSuit && (
          <div className="absolute bottom-0 left-0 p-4 items-center justify-center">
            <h5 className="text-white text-xs pb-1">Trump Suit:</h5>
            <Card suit={trumpSuit} />
          </div>
        )}
      </div>
    </div>
  );
};

export default GameBoard;
