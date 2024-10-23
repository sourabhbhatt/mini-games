import React from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import Card from "./Card";
import DiscardPile from "./DiscardPile";

const Scoreboard = ({ team = "A" }) => {
  // Access the teams' data and scores from the Redux store
  const { teams } = useSelector((state) => state.game);
  const teamA = teams.teamA;
  const teamB = teams.teamB;

  // Get team names and scores
  const teamAName = "Team A";
  const teamAScore = teamA.score;
  const teamBName = "Team B";
  const teamBScore = teamB.score;
  const collectedCards =
    team === "A" ? teamA.collectedCards : teamB.collectedCards;

  // Determine which team is leading
  const isTeamALeading = teamAScore > teamBScore;
  const isTeamBLeading = teamBScore > teamAScore;
  const isTie = teamAScore === teamBScore && teamAScore === 0; // Initial state when both scores are 0

  // Motion settings for hanging animation
  const hangingAnimation = {
    initial: { y: -20, rotate: -2 },
    animate: { y: 0, rotate: 0 },
    transition: { type: "spring", stiffness: 200, damping: 10 },
  };

  // Rope effect
  const ropeStyle = "w-[2px] h-[50px] bg-gray-500 mx-auto mb-[-10px]";

  // Determine the background color for Team A and Team B
  const teamAColor = isTie
    ? "bg-blue-300"
    : isTeamALeading
    ? "bg-green-500"
    : "bg-red-500";
  const teamBColor = isTie
    ? "bg-blue-300"
    : isTeamBLeading
    ? "bg-green-500"
    : "bg-red-500";

  // Conditionally show Team A or Team B with color based on the score
  return (
    <div
      className={`absolute top-0 ${
        team === "A" ? "left-10" : "right-10"
      } flex flex-col items-center`}
    >
      <div className={ropeStyle}></div>

      <motion.div
        className={`flex flex-col items-center p-4 ${
          team === "A" ? teamAColor : teamBColor
        } text-white rounded-lg shadow-lg border-4 ${
          (team === "A" && isTeamALeading) || (team === "B" && isTeamBLeading)
            ? "border-yellow-400"
            : "border-gray-300"
        }`}
        {...hangingAnimation}
      >
        <h3 className="text-lg font-bold">
          {team === "A" ? teamAName : teamBName}
        </h3>
        <p className="text-3xl font-semibold">
          {team === "A" ? teamAScore : teamBScore}
        </p>
      </motion.div>
      <div
        className={`absolute top-[-30px] ${
          team === "A" ? "left-10" : "right-10"
        } flex flex-col items-center`}
      >
        <DiscardPile currentTrick={collectedCards || []} />
      </div>
    </div>
  );
};

export default Scoreboard;
