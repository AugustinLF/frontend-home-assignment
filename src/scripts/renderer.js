const generateId = id => `card-${id}`;

const createCardElement = (card, gameEngine, gameState) => {
  const imgCard = document.createElement("img");
  imgCard.classList.add("card");
  if (!card.flipped) imgCard.classList.add("card-back");
  imgCard.id = generateId(card.id);
  imgCard.src = card.flipped
    ? `http://localhost:8111/png/${card.content}/200`
    : `http://localhost:8111/png/card/200`;

  if (card.checked) {
    imgCard.classList.add("card-checked");
  } else if (!gameState.waiting) {
    imgCard.addEventListener("click", () => {
      gameEngine.updateCard(card, gameState);
    });
  }
  return imgCard;
};

export const renderElements = (gameState, gameEngine) => {
  gameState.cardList.forEach((cardId, index) => {
    const card = gameState.cardMap.get(cardId);
    document
      .getElementById(generateId(card.id))
      .replaceWith(createCardElement(card, gameEngine, gameState));
  });
};

export const boot = (gameState, gameEngine) => {
  const root = document.getElementById("root");

  gameState.cardList.forEach(card => {
    const imgCard = createCardElement(
      gameState.cardMap.get(card),
      gameEngine,
      gameState
    );

    root.append(imgCard);
  });
};
