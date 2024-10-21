// components/Player.js

import React, { useEffect } from "react";
import Card from "../Card";
import "./Player.css";

const Player = ({
  position,
  name,
  color,
  cards,
  isCurrentPlayer,
  playCard,
  playerImage,
}) => {
  return (
    <div
      className={`player player-${position}`}
      // style={{ backgroundColor: color }}
    >
      <div className="player-row">
        <img src={playerImage} alt={name} className="player-image" />
        <div
          className={`player-cards ${
            isCurrentPlayer ? "current-player" : "non-current-player"
          }`}
        >
          {isCurrentPlayer
            ? cards.map((card, index) => {
                return (
                  <Card
                    key={index}
                    value={card.value}
                    suit={card.suit}
                    playCard={playCard}
                    color={card.color}
                    isCurrentPlayer={isCurrentPlayer}
                  />
                );
              })
            : cards.length > 0 && (
                <Card
                  value={cards[cards.length - 1].value}
                  suit={cards[cards.length - 1].suit}
                  isCurrentPlayer={isCurrentPlayer}
                />
              )}
        </div>
      </div>
      <div className="player-info">{name}</div>
    </div>
  );
};

export default Player;
