import React, { createContext, useState } from "react";

// Create the context
export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [teamAName, setTeamAName] = useState("");
  const [teamBName, setTeamBName] = useState("");
  const [playerNames, setPlayerNames] = useState({
    playerA1: "",
    playerA2: "",
    playerB1: "",
    playerB2: "",
  });
  const [method, setMethod] = useState(null); // Game method (1 or 2)

  // Method to handle form submission (start the game)
  const handleSubmit = () => {
    // Set default names if fields are empty
    setTeamAName((prev) => prev.trim() || "Team A");
    setTeamBName((prev) => prev.trim() || "Team B");

    setPlayerNames((prev) => ({
      playerA1: prev.playerA1.trim() || "Player A1",
      playerA2: prev.playerA2.trim() || "Player A2",
      playerB1: prev.playerB1.trim() || "Player B1",
      playerB2: prev.playerB2.trim() || "Player B2",
    }));

    if (!method) {
      setMethod(1); // Default to method 1 if not selected
    }

    // Close the modal after setting the names
    setIsModalOpen(false);
  };

  return (
    <GameContext.Provider
      value={{
        isModalOpen,
        setIsModalOpen,
        teamAName,
        setTeamAName,
        teamBName,
        setTeamBName,
        playerNames,
        setPlayerNames,
        method,
        setMethod,
        handleSubmit,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
