// components/Scoreboard.js

import React from "react";
import "./scoreboard.css"; // Import the separate stylesheet for the scoreboard

const Scoreboard = ({ teamAName, teamAScore, teamBName, teamBScore }) => {
  return (
    <div className="scoreboard">
      <div className="team">
        <h3>{teamAName}</h3>
        <p>{teamAScore}</p>
      </div>
      <div className="team">
        <h3>{teamBName}</h3>
        <p>{teamBScore}</p>
      </div>
    </div>
  );
};

export default Scoreboard;
