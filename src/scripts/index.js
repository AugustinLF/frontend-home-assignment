import "./index.scss";

import { boot, renderElements } from "./renderer";
import { handleCheckedCards } from "./handleCheckedCard";

const names = [
  "bob",
  "jane",
  "joe",
  "jack",
  "anothername",
  "whystopthere",
  "noinspiration",
  "illbeok"
];
const difficultyMapping = {
  easy: 4,
  intermediate: 6,
  hard: 8
};
const createGameState = difficulty => {
  const initialGameState = names.slice(0, difficultyMapping[difficulty]).reduce(
    (state, name, index) => {
      const firstCard = {
        // when true, the user sees the content of the card
        flipped: false,
        content: name,
        id: index * 2,
        // true when the user found two pairs
        checked: false
      };
      const secondCard = {
        flipped: false,
        content: name,
        id: index * 2 + 1,
        checked: false
      };

      return Object.assign({}, state, {
        waiting: false,
        cardMap: state.cardMap
          .set(firstCard.id, firstCard)
          .set(secondCard.id, secondCard),
        cardList: [...state.cardList, firstCard.id, secondCard.id]
      });
    },
    {
      difficulty,
      // A map makes it easier/faster to read/write specific card based on their id than looping
      // over and over again on an array
      cardMap: new Map(),
      cardList: [],
      // used to prevent the user from clicking while waiting to flip back the clicked cards
      waiting: false,
      tries: 0
    }
  );
  initialGameState.cardList.sort((a, b) => Math.random() - 0.5);
  return initialGameState;
};

// This function is ran whenever a card is flipped. It takes care of updating the state before
// calling for a rerender
const updateCard = (card, gameState) => {
  const { id } = card;

  const updatedGameState = Object.assign({}, gameState, {
    tries: gameState.tries + 1,
    cardMap: new Map(gameState.cardMap)
  });

  let cardsCurrentlyRevealed = 0;
  for (const element of updatedGameState.cardMap.values()) {
    if (element.flipped && !element.checked) cardsCurrentlyRevealed++;
  }

  updatedGameState.cardMap.set(id, Object.assign({}, card, { flipped: true }));

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
        renderElements(newGameState, updateCard);
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
        boot(createGameState(gameState.difficulty), updateCard);
      }
    }, 300);
  }

  renderElements(updatedGameState, updateCard);
};

document.getElementById("buttons").addEventListener("click", e => {
  // Thanks to event delegation, we add only one listener
  boot(createGameState(e.target.getAttribute("data-difficulty")), updateCard);
});

boot(createGameState("easy"), updateCard);
