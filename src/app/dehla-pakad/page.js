"use client";

import { useState, useEffect } from "react";
import Deck from "./components/Deck";
import Player from "./components/Player";
import Scoreboard from "./components/Scoreboard";
import Card from "./components/Card"; // Import Card component
import {
  initializeDeck,
  playCard as handlePlayCard,
} from "./components/gameLogic";
import "./dehlaPakad.css";

export default function DehlaPakadGame() {
  const [players, setPlayers] = useState({
    playerA1: [],
    playerA2: [],
    playerB1: [],
    playerB2: [],
  });

  const [currentPlayer, setCurrentPlayer] = useState("playerA1");
  const [isModalOpen, setIsModalOpen] = useState(true); // Modal starts open
  const [teamAScore, setTeamAScore] = useState(0);
  const [teamBScore, setTeamBScore] = useState(0);

  const [trumpSuit, setTrumpSuit] = useState(null); // Track the trump suit
  const [method, setMethod] = useState(null); // Track the chosen method (1 or 2)
  const [tricksPlayed, setTricksPlayed] = useState(0); // Count tricks played
  const [cardsDealt, setCardsDealt] = useState(false); // Track if all cards are dealt

  const [playedCard, setPlayedCard] = useState(null); // Track the played card

  // Store player and team names
  const [teamAName, setTeamAName] = useState("");
  const [teamBName, setTeamBName] = useState("");
  const [playerNames, setPlayerNames] = useState({
    playerA1: "",
    playerA2: "",
    playerB1: "",
    playerB2: "",
  });

  const PLAYER_DETAILS = {
    playerA1: { color: "#FFD700", position: "bottom" },
    playerA2: { color: "#FFCCCB", position: "top" },
    playerB1: { color: "#ADD8E6", position: "left" },
    playerB2: { color: "#90EE90", position: "right" },
  };

  useEffect(() => {
    const initialPlayers = initializeDeck(Deck, 5); // Deal 5 cards initially
    setPlayers(initialPlayers);
  }, []);

  const onPlayCard = (player, card) => {
    setPlayedCard(card); // Set the played card to display at the center

    // Handle the card play logic
    handlePlayCard(
      player,
      card,
      players,
      setPlayers,
      setCurrentPlayer,
      teamAScore,
      teamBScore,
      setTeamAScore,
      setTeamBScore
    );

    // Method 1: Determine trump suit if a player cannot follow suit
    if (method === 1 && !trumpSuit) {
      if (!playerCanFollowSuit(player, card)) {
        setTrumpSuit(card.suit); // The suit becomes the trump
        setCardsDealt(true); // Deal the remaining cards
        dealRemainingCards();
      }
      setTricksPlayed(tricksPlayed + 1);
    }

    // Method 2: Trump suit already determined by the player to dealer's right
    if (method === 2 && !cardsDealt) {
      dealRemainingCards(); // Deal the remaining cards after trump is chosen
    }
  };

  // Function to determine if a player can follow suit
  const playerCanFollowSuit = (player, card) => {
    // Logic to check if the player has a card of the same suit as the one led
    // If they can't follow suit, trump suit is set
    return players[player].some((playerCard) => playerCard.suit === card.suit);
  };

  // Deal the remaining cards
  const dealRemainingCards = () => {
    const updatedPlayers = initializeDeck(Deck, 8); // Deal 8 more cards to each player
    setPlayers((prev) => ({
      playerA1: [...prev.playerA1, ...updatedPlayers.playerA1],
      playerA2: [...prev.playerA2, ...updatedPlayers.playerA2],
      playerB1: [...prev.playerB1, ...updatedPlayers.playerB1],
      playerB2: [...prev.playerB2, ...updatedPlayers.playerB2],
    }));
    setCardsDealt(true);
  };

  const renderPlayer = (playerKey) => {
    const { color, position } = PLAYER_DETAILS[playerKey];
    return (
      <Player
        key={playerKey}
        position={position}
        name={playerNames[playerKey]}
        color={color}
        cards={players[playerKey]}
        isCurrentPlayer={currentPlayer === playerKey}
        playCard={(card) => onPlayCard(playerKey, card)}
        playerImage="/player.png" // Default player image
      />
    );
  };

  return (
    <>
      {/* Scoreboard */}
      <Scoreboard
        teamAName={teamAName || "Team A"}
        teamAScore={teamAScore}
        teamBName={teamBName || "Team B"}
        teamBScore={teamBScore}
      />

      {/* Game board */}
      <div className="game-container">
        <div className="central-area">
          {["playerA2", "playerB1", "playerB2"].map(renderPlayer)}
        </div>
        <div className="bottom-player">{renderPlayer("playerA1")}</div>

        {/* Display the played card in the center */}
        {playedCard && (
          <div className="played-card">
            <Card
              value={playedCard.value}
              suit={playedCard.suit}
              color={
                playedCard.suit === "♣" || playedCard.suit === "♠"
                  ? "black"
                  : "red"
              }
              isCurrentPlayer={true} // The played card is always visible
            />
          </div>
        )}
      </div>

      {/* Modal for getting team and player names */}
    </>
  );
}
