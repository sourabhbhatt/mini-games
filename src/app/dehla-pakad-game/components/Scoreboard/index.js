import React from "react";
import { useSelector } from "react-redux";
import "./scoreboard.css"; // Import the separate stylesheet for the scoreboard

const Scoreboard = ({ team = "A" }) => {
  // Access the teams' data and scores from the Redux store
  const { teams } = useSelector((state) => state.game);

  // Get team names and scores
  const teamAName = "Team A";
  const teamAScore = teams.teamA.score;
  const teamBName = "Team B";
  const teamBScore = teams.teamB.score;

  // Determine which team is leading
  const isTeamALeading = teamAScore > teamBScore;
  const isTeamBLeading = teamBScore > teamAScore;

  return (
    <div className="scoreboard">
      {/* Team A */}
      <div className={`team ${isTeamALeading ? "leading" : ""}`}>
        <h3>{teamAName}</h3>
        <p className="score">{teamAScore}</p>
      </div>

      {/* Separator */}
      <div className="separator">VS</div>

      {/* Team B */}
      <div className={`team ${isTeamBLeading ? "leading" : ""}`}>
        <h3>{teamBName}</h3>
        <p className="score">{teamBScore}</p>
      </div>
    </div>
  );
};

export default Scoreboard;
