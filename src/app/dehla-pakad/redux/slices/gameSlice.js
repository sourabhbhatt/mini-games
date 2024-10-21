import { createSlice } from "@reduxjs/toolkit";
import Deck from "../../components/Deck";

const deck = new Deck();
deck.shuffle();

const initialState = {
  teams: {
    teamA: {
      players: [
        {
          id: 1,
          name: "Player 1",
          hand: deck.deal(5),
          profilePic: "/player-new.png",
        },
        {
          id: 3,
          name: "Player 3",
          hand: deck.deal(5),
          profilePic: "/player-new.png",
        },
      ],
      score: 0,
    },
    teamB: {
      players: [
        {
          id: 2,
          name: "Player 2",
          hand: deck.deal(5),
          profilePic: "/player-new.png",
        },
        {
          id: 4,
          name: "Player 4",
          hand: deck.deal(5),
          profilePic: "/player-new.png",
        },
      ],
      score: 0,
    },
  },
  trumpSuit: null, // The trump suit
  currentTrick: [],
  turn: 1, // Start with Player 1
  gamePhase: "initial", // Can be 'initial', 'method1', 'method2', or 'trumpDetermined'
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    playCard: (state, action) => {
      const { playerId, card } = action.payload;
      state.currentTrick.push({ ...card, playerId });

      // Find the team and remove the card from the player's hand
      const team = state.teams.teamA.players.find((p) => p.id === playerId)
        ? state.teams.teamA
        : state.teams.teamB;
      const player = team.players.find((player) => player.id === playerId);
      player.hand = player.hand.filter((c) => c !== card);

      // After the 5th trick, if a player can't follow suit, determine trump in Method 1
      if (
        state.currentTrick.length >= 5 &&
        state.trumpSuit === null &&
        state.gamePhase === "method1"
      ) {
        const playedSuits = state.currentTrick.map((card) => card.suit);
        const allSameSuit = playedSuits.every(
          (suit) => suit === playedSuits[0]
        );

        if (!allSameSuit) {
          // If the player breaks the suit, the trump suit is the first non-following suit
          state.trumpSuit =
            state.currentTrick[state.currentTrick.length - 1].suit;
          state.gamePhase = "trumpDetermined";
        }
      }
    },
    determineTrumpByRandomDraw: (state) => {
      // If no player breaks suit after 5 tricks, randomly draw a card for the trump suit
      state.trumpSuit = deck.drawRandomCard().suit;
      state.gamePhase = "trumpDetermined";
    },
    announceTrump: (state, action) => {
      // In Method 2, the player announces the trump suit after the first 5 cards are dealt
      state.trumpSuit = action.payload;
      state.gamePhase = "trumpDetermined";
    },
    nextTurn: (state) => {
      state.turn = (state.turn % 4) + 1; // Moves the turn to the next player (circular from 1 to 4)
    },
    calculateScores: (state) => {
      // Determine the winning card (you can replace this with actual logic)
      const winningCard = state.currentTrick[0]; // Placeholder logic, should be replaced
      const winningPlayerId = winningCard.playerId;

      // Find the team of the winning player
      const winningTeam = state.teams.teamA.players.find(
        (p) => p.id === winningPlayerId
      )
        ? "teamA"
        : "teamB";

      // Award points to the winning team
      state.teams[winningTeam].score += 10; // Example: 10 points for winning a trick

      // Clear the current trick for the next round
      state.currentTrick = [];
    },
    resetWinner: (state) => {
      state.winningPlayerId = null; // Reset winner for the next hand
    },
  },
});

export const {
  playCard,
  determineTrumpByRandomDraw,
  announceTrump,
  nextTurn,
  calculateScores,
  resetWinner,
} = gameSlice.actions;
export default gameSlice.reducer;
