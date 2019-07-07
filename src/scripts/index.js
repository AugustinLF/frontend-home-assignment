import "./index.scss";

import { boot, renderNeededElements } from "./renderer";

const names = ["bob", "jane"];
const gameState = {
  cards: names.reduce((cards, name, index) => {
    const firstCard = {
      flipped: false,
      content: name,
      id: index * 2,
      checked: false
    };
    const secondCard = {
      flipped: false,
      content: name,
      id: index * 2 + 1,
      checked: false
    };
    firstCard.sibling = secondCard;
    secondCard.sibling = firstCard;
    return [...cards, firstCard, secondCard];
  }, [])
};

const gameEngine = {
  updateCard: (id, update) => {
    const cardsBeforeUpdate = gameState.cards;
    gameState.cards = gameState.cards.map(card =>
      card.id === id ? update(card) : card
    );
    renderNeededElements(gameState, cardsBeforeUpdate, gameEngine);
  }
};
console.log(gameState);
boot(gameState, gameEngine);
