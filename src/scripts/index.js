import "./index.scss";

import { boot, renderElements } from "./renderer";
import { handleCheckedCards } from "./handleCheckedCard";

const names = ["bob", "jane"];
const initialGameState = names.reduce(
  (state, name, index) => {
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

    return {
      cardMap: state.cardMap
        .set(firstCard.id, firstCard)
        .set(secondCard.id, secondCard),
      cardList: [...state.cardList, firstCard.id, secondCard.id]
    };
  },
  {
    cardMap: new Map(),
    cardList: [],
    waiting: false
  }
);

const getCardsAsList = state =>
  state.cardList.map(card => state.cardMap.get(card));

const gameEngine = {
  updateCard: (card, gameState) => {
    const { id } = card;

    let cardsCurrentlyRevealed = 0;
    for (const element of gameState.cardMap.values()) {
      if (element.flipped && !element.checked) cardsCurrentlyRevealed++;
    }

    console.log({ cardsCurrentlyRevealed }, gameState.cardMap);
    if (cardsCurrentlyRevealed === 2) {
      // Can't flip more than two cards at the same time
      return;
    }
    const flipped = !card.flipped;
    gameState.cardMap.set(id, Object.assign({}, card, { flipped }));

    if (cardsCurrentlyRevealed) {
      const { updatedCardMap, success } = handleCheckedCards(gameState);
      if (success) {
        gameState.cardMap = updatedCardMap;
      } else {
        console.log("here");
        gameState.waiting = true;
        setTimeout(() => {
          const newGameState = Object.assign({}, gameState, {
            waiting: false,
            cardMap: updatedCardMap
          });
          renderElements(newGameState, gameEngine);
        }, 1000);
      }
    }

    renderElements(gameState, gameEngine);
  }
};
boot(initialGameState, gameEngine);
