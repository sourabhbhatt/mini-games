const suits = [
  { symbol: "♠", color: "black" },
  { symbol: "♣", color: "black" },
  { symbol: "♥", color: "red" },
  { symbol: "♦", color: "red" },
];

const values = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A",
];

class Deck {
  constructor() {
    this.deck = [];
    this.createDeck();
    this.shuffle();
  }

  createDeck() {
    for (let suit of suits) {
      for (let value of values) {
        this.deck.push({
          suit: suit.symbol,
          value,
          color: suit.color, // Assign color based on suit
        });
      }
    }
  }

  shuffle() {
    for (let i = this.deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
    }
  }

  deal(numCards) {
    return this.deck.splice(0, numCards);
  }
}

export default Deck;
