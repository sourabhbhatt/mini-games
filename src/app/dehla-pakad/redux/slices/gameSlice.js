import { createSlice } from "@reduxjs/toolkit";
import Deck from "../../components/Deck";

const deck = new Deck();
deck.shuffle();

const initialState = {
  teams: {
    teamA: {
      players: [
        { id: 1, name: "Player 1", hand: [], profilePic: "/player-new.png" },
        { id: 3, name: "Player 3", hand: [], profilePic: "/player-new.png" },
      ],
      score: 0,
      collectedCards: [], // Keep track of collected tricks
    },
    teamB: {
      players: [
        { id: 2, name: "Player 2", hand: [], profilePic: "/player-new.png" },
        { id: 4, name: "Player 4", hand: [], profilePic: "/player-new.png" },
      ],
      score: 0,
      collectedCards: [], // Keep track of collected tricks
    },
  },
  trumpSuit: null, // The trump suit
  currentSuit: null, // The current suit being played
  currentTrick: [], // The current cards in play for the trick
  turn: null, // Track the current turn
  dealer: null, // Track the current dealer
  gamePhase: "initial", // Game phases: 'initial', 'method1', 'method2', 'trumpDetermined', 'trickTaking'
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    shuffleAndDealCards: (state) => {
      // Shuffle deck and deal 5 cards to each player
      deck.shuffle();
      state.teams.teamA.players[0].hand = deck.deal(5);
      state.teams.teamA.players[1].hand = deck.deal(5);
      state.teams.teamB.players[0].hand = deck.deal(5);
      state.teams.teamB.players[1].hand = deck.deal(5);
      state.currentSuit = null;
    },

    selectDealer: (state) => {
      // Select a random dealer from players at the start
      const allPlayers = [
        ...state.teams.teamA.players,
        ...state.teams.teamB.players,
      ];
      const randomDealerIndex = Math.floor(Math.random() * allPlayers.length);
      state.dealer = allPlayers[randomDealerIndex].id;
      state.turn = allPlayers[(randomDealerIndex + 1) % 4].id; // The player to the right of the dealer starts
    },

    playCard: (state, action) => {
      const { playerId, card } = action.payload;
      const team = state.teams.teamA.players.find((p) => p.id === playerId)
        ? state.teams.teamA
        : state.teams.teamB;
      const player = team.players.find((player) => player.id === playerId);

      // If it's the first card of the trick, set the current suit
      if (state.currentTrick.length === 0) {
        state.currentSuit = card.suit;
      }

      // Push the card to the current trick
      state.currentTrick.push({ ...card, playerId });

      // Remove the card from the player's hand
      player.hand = player.hand.filter((c) => c !== card);

      // Check if all 4 players have played a card (i.e., the trick is complete)
      if (state.currentTrick.length === 4) {
        // Call calculateWinnerOfTrick to determine the winner of the trick
        gameSlice.caseReducers.calculateWinnerOfTrick(state);
      } else {
        // Move to the next player's turn
        gameSlice.caseReducers.nextTurn(state);
      }
    },

    nextTurn: (state) => {
      const allPlayers = [
        ...state.teams.teamA.players,
        ...state.teams.teamB.players,
      ];
      const currentIndex = allPlayers.findIndex((p) => p.id === state.turn);
      state.turn = allPlayers[(currentIndex + 1) % 4].id;
    },

    announceTrump: (state, action) => {
      // In Method 2, the player announces the trump suit after the first 5 cards are dealt
      state.trumpSuit = action.payload;
      state.gamePhase = "trumpDetermined";
    },

    calculateWinnerOfTrick: (state) => {
      // Step 1: Check if anyone played a 10 of the current suit
      let winningCard = null;
      let winningPlayerId = null;

      // Check for 10 of the current suit
      state.currentTrick.forEach((card) => {
        if (card.value === "10" && card.suit === state.currentSuit) {
          winningCard = card;
          winningPlayerId = card.playerId;
        }
      });

      // Step 2: If no 10 of the current suit, check for any 10
      if (!winningCard) {
        state.currentTrick.forEach((card) => {
          if (card.value === "10") {
            winningCard = card;
            winningPlayerId = card.playerId;
          }
        });
      }

      // Step 3: If no 10 was played, pick the highest card of the current suit
      if (!winningCard) {
        state.currentTrick.forEach((card) => {
          if (card.suit === state.currentSuit) {
            if (!winningCard || card.value > winningCard.value) {
              winningCard = card;
              winningPlayerId = card.playerId;
            }
          }
        });
      }

      // Step 4: Determine which team the winning player belongs to and award points
      const winningTeam = state.teams.teamA.players.find(
        (p) => p.id === winningPlayerId
      )
        ? "teamA"
        : "teamB";

      // Add the cards to the winning team's collection
      state.teams[winningTeam].collectedCards.push(...state.currentTrick);

      // Award points to the winning team
      state.teams[winningTeam].score += 10; // Example: 10 points for winning a trick

      // Clear the current trick for the next round
      state.currentTrick = [];
      state.currentSuit = null; // Reset the suit for the next trick
      state.turn = winningPlayerId; // The winner of the trick leads the next one
    },

    resetForNextRound: (state) => {
      state.currentTrick = [];
      state.trumpSuit = null;
      state.currentSuit = null;
      state.gamePhase = "initial";
    },
  },
});

export const {
  shuffleAndDealCards,
  selectDealer,
  playCard,
  nextTurn,
  announceTrump,
  calculateWinnerOfTrick,
  resetForNextRound,
} = gameSlice.actions;
export default gameSlice.reducer;
