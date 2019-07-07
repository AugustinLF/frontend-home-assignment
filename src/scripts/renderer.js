const generateId = id => `card-${id}`;

// it could be interesting of replacing this pattern of recreating the node from scratch by simple
// DOM updates, and using event delegation to have a single event handler. It would also mean that
// we wouldn't have to pass updateCard everywhere
const createCardElement = (card, updateCard, gameState) => {
  const imgCard = document.createElement("img");
  imgCard.classList.add("card");
  if (!card.flipped) imgCard.classList.add("card-back");
  imgCard.id = generateId(card.id);
  imgCard.src = card.flipped
    ? `http://localhost:8111/png/${card.content}/200`
    : `http://localhost:8111/png/card/200`;

  if (card.checked) {
    imgCard.classList.add("card-checked");
  } else if (!gameState.waiting && !card.flipped) {
    imgCard.addEventListener("click", () => {
      updateCard(card, gameState);
    });
  }
  return imgCard;
};

export const renderElements = (gameState, updateCard) => {
  gameState.cardList.forEach((cardId, index) => {
    const card = gameState.cardMap.get(cardId);
    document
      .getElementById(generateId(card.id))
      .replaceWith(createCardElement(card, updateCard, gameState));
  });
  setCounter(gameState);
};

const setCounter = gameState => {
  document.getElementById("counter").innerHTML = gameState.tries;
};

export const boot = (gameState, updateCard) => {
  const root = document.getElementById("root");
  root.innerHTML = "";

  gameState.cardList.forEach(card => {
    const imgCard = createCardElement(
      gameState.cardMap.get(card),
      updateCard,
      gameState
    );
    setCounter(gameState);

    root.append(imgCard);
  });
};
