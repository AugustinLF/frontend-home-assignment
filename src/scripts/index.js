import "./index.scss";

import { boot, renderElements } from "./renderer";
import { handleCheckedCards } from "./handleCheckedCard";

const names = ["bob", "jane", "joe", "jack"];
const createGameState = () => {
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
        waiting: false,
        tries: state.tries,
        cardMap: state.cardMap
          .set(firstCard.id, firstCard)
          .set(secondCard.id, secondCard),
        cardList: [...state.cardList, firstCard.id, secondCard.id]
      };
    },
    {
      cardMap: new Map(),
      cardList: [],
      waiting: false,
      tries: 0
    }
  );
  initialGameState.cardList.sort((a, b) => Math.random() - 0.5);
  return initialGameState;
};

const getCardsAsList = state =>
  state.cardList.map(card => state.cardMap.get(card));

const gameEngine = {
  updateCard: (card, gameState) => {
    const { id } = card;

    const updatedGameState = Object.assign({}, gameState, {
      tries: gameState.tries + 1
    });

    let cardsCurrentlyRevealed = 0;
    for (const element of updatedGameState.cardMap.values()) {
      if (element.flipped && !element.checked) cardsCurrentlyRevealed++;
    }

    const flipped = !card.flipped;
    updatedGameState.cardMap.set(id, Object.assign({}, card, { flipped }));

    // When the user clicks on their first card, the count is 0. We're only interested when two
    // cards are face up
    if (cardsCurrentlyRevealed) {
      const { updatedCardMap, success } = handleCheckedCards(updatedGameState);
      if (success) {
        updatedGameState.cardMap = updatedCardMap;
      } else {
        updatedGameState.waiting = true;
        setTimeout(() => {
          const newGameState = Object.assign({}, updatedGameState, {
            waiting: false,
            cardMap: updatedCardMap
          });
          renderElements(newGameState, gameEngine);
        }, 300);
      }
    }

    let endGame = true;
    for (const element of updatedGameState.cardMap.values()) {
      if (!element.checked) {
        endGame = false;
        break;
      }
    }
    if (endGame) {
      setTimeout(() => {
        if (confirm("You're amazing! Want to try again?")) {
          boot(createGameState(), gameEngine);
        }
      }, 300);
    }

    renderElements(updatedGameState, gameEngine);
  }
};
boot(createGameState(), gameEngine);
