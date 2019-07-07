const generateId = id => `card-${id}`;

const createCardElement = (card, gameEngine) => {
  const imgCard = document.createElement("img");
  imgCard.classList.add("card");
  if (!card.flipped) imgCard.classList.add("card-back");
  imgCard.id = generateId(card.id);
  imgCard.src = card.flipped
    ? `http://localhost:8111/png/${card.content}/200`
    : `http://localhost:8111/png/card/200`;

  imgCard.addEventListener("click", () => {
    gameEngine.updateCard(card.id, card =>
      Object.assign({}, card, {
        flipped: !card.flipped
      })
    );
  });
  return imgCard;
};

export const renderNeededElements = (
  { cards },
  cardsBeforeUpdate,
  gameEngine
) => {
  cards.forEach((card, index) => {
    // Since we don't mutate the card object, we don't have to do a shallow compare, comparing
    // the references is enough. Yay for immutability
    if (cards[index] !== cardsBeforeUpdate[index]) {
      console.log("updating index", index);
      document
        .getElementById(generateId(card.id))
        .replaceWith(createCardElement(card, gameEngine));
    }
  });
};

export const boot = (gameState, gameEngine) => {
  const root = document.getElementById("root");
  console.log(gameState);

  gameState.cards.forEach(card => {
    const imgCard = createCardElement(card, gameEngine);

    root.append(imgCard);
  });
};
