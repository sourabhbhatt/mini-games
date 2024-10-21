// components/gameLogic.js

export function initializeDeck(Deck) {
  const deck = new Deck();
  return {
    playerA1: deck.deal(13),
    playerA2: deck.deal(13),
    playerB1: deck.deal(13),
    playerB2: deck.deal(13),
  };
}

export function getNextPlayer(currentPlayer) {
  if (currentPlayer === "playerA1") return "playerA2";
  if (currentPlayer === "playerA2") return "playerB1";
  if (currentPlayer === "playerB1") return "playerB2";
  return "playerA1"; // Loops back to playerA1
}

export function updateScore(
  currentPlayer,
  teamAScore,
  teamBScore,
  setTeamAScore,
  setTeamBScore
) {
  // Example logic to update score based on the team
  if (currentPlayer === "playerA1" || currentPlayer === "playerA2") {
    setTeamAScore((prevScore) => prevScore + 10); // Add 10 points to Team A
  } else {
    setTeamBScore((prevScore) => prevScore + 10); // Add 10 points to Team B
  }
}

export function playCard(
  currentPlayer,
  card,
  players,
  setPlayers,
  setCurrentPlayer,
  teamAScore,
  teamBScore,
  setTeamAScore,
  setTeamBScore
) {
  // Remove the played card from the player's hand
  const updatedPlayers = {
    ...players,
    [currentPlayer]: players[currentPlayer].filter((c) => c !== card),
  };
  setPlayers(updatedPlayers);

  // Update the score
  updateScore(
    currentPlayer,
    teamAScore,
    teamBScore,
    setTeamAScore,
    setTeamBScore
  );

  // Move to the next player
  const nextPlayer = getNextPlayer(currentPlayer);
  setCurrentPlayer(nextPlayer);
}
