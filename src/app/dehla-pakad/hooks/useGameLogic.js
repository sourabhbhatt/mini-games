import { useState, useEffect } from "react";
import Deck from "../components/Deck";

const useGameLogic = () => {
  const [deck, setDeck] = useState(new Deck());
  const [players, setPlayers] = useState([
    { id: 1, name: "Player 1", hand: [], score: 0 },
    { id: 2, name: "Player 2", hand: [], score: 0 },
    { id: 3, name: "Player 3", hand: [], score: 0 },
    { id: 4, name: "Player 4", hand: [], score: 0 },
  ]);

  useEffect(() => {
    deck.shuffle();
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) => ({
        ...player,
        hand: deck.deal(),
      }))
    );
  }, [deck]);

  return { players, deck };
};

export default useGameLogic;
