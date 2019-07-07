export const handleCheckedCards = gameState => {
  // don't mutate your params
  const cardMap = new Map(gameState.cardMap);

  let ids = [];
  gameState.cardMap.forEach(card => {
    if (card.flipped && !card.checked) ids.push(card.id);
  });

  let success;
  // The good thing is that there can't be more than two cards that we need to check at a given time
  // so we don't have any perf risk
  const firstPick = cardMap.get(ids[0]);
  const secondPick = cardMap.get(ids[1]);
  // the user picked the correct cards
  if (firstPick.content === secondPick.content) {
    (success = true),
      cardMap
        .set(ids[0], Object.assign({}, firstPick, { checked: true }))
        .set(ids[1], Object.assign({}, secondPick, { checked: true }));
  } else {
    success = false;
    cardMap
      .set(ids[0], Object.assign({}, firstPick, { flipped: false }))
      .set(ids[1], Object.assign({}, secondPick, { flipped: false }));
  }

  return {
    success,
    updatedCardMap: cardMap
  };
};
