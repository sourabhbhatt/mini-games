class Card {
  constructor(suit, value) {
    this.suit = suit;
    this.value = value;
  }
}

class Deck {
  constructor() {
    this.suits = ["♠", "♥", "♣", "♦"];
    this.values = [
      "A",
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
    ];
    this.cards = [];
    this.createDeck();
  }

  createDeck() {
    for (let suit of this.suits) {
      for (let value of this.values) {
        this.cards.push(new Card(suit, value));
      }
    }
  }

  shuffle() {
    this.cards.sort(() => Math.random() - 0.5);
  }

  deal(numCards) {
    return this.cards.splice(0, numCards); // Deal numCards to each player
  }

  drawRandomCard() {
    const randomIndex = Math.floor(Math.random() * this.cards.length);
    return this.cards[randomIndex];
  }
}

export default Deck;
