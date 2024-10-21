import React from "react";
import "./Card.css";

const Card = ({ value, suit, color, playCard, isCurrentPlayer }) => {
  return (
    <button
      className={`card ${suit.toLowerCase()}`}
      onClick={() => isCurrentPlayer && playCard && playCard({ value, suit })}
      style={{ color: color }} // Set card text color dynamically
    >
      {/* Top-left corner for value and suit */}
      <div className="corner top-left">
        <span className="card-suit">{suit}</span>
        <span className="card-value">{value}</span>
      </div>

      <div className="center-value-container">
        <span className="center-value">{value}</span>
      </div>

      {/* Bottom-right corner for value and suit */}
      <div className="corner bottom-right">
        <span className="card-suit">{suit}</span>
      </div>

      {/* Large suit symbol in the center */}
      <div className="card-center">
        <span className="big-suit">{suit}</span>
      </div>
    </button>
  );
};

export default Card;
