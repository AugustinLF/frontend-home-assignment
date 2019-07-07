import { handleCheckedCards } from "../handleCheckedCard";

describe("handleCheckedCards", () => {
  it("Should flip back cards not matching and leave the other untouched", () => {
    const gameState = {
      cardMap: new Map()
        .set(1, { id: 1, content: "A", flipped: true, checked: false })
        .set(2, { id: 2, content: "B", flipped: true, checked: false })
        .set(3, { id: 3, content: "C", flipped: true, checked: true })
        .set(4, { id: 4, content: "C", flipped: true, checked: true })
        .set(5, { id: 5, content: "A", flipped: false, checked: false })
        .set(6, { id: 6, content: "B", flipped: false, checked: false })
    };
    expect(handleCheckedCards(gameState)).toEqual(
      new Map()
        .set(1, { id: 1, content: "A", flipped: false, checked: false })
        .set(2, { id: 2, content: "B", flipped: false, checked: false })
        .set(3, { id: 3, content: "C", flipped: true, checked: true })
        .set(4, { id: 4, content: "C", flipped: true, checked: true })
        .set(5, { id: 5, content: "A", flipped: false, checked: false })
        .set(6, { id: 6, content: "B", flipped: false, checked: false })
    );
  });

  it("Should flip mark as checked cards matching and leave the other untouched", () => {
    const gameState = {
      cardMap: new Map()
        .set(1, { id: 1, content: "A", flipped: true, checked: false })
        .set(2, { id: 2, content: "B", flipped: false, checked: false })
        .set(3, { id: 3, content: "C", flipped: true, checked: true })
        .set(4, { id: 4, content: "C", flipped: true, checked: true })
        .set(5, { id: 5, content: "A", flipped: true, checked: false })
        .set(6, { id: 6, content: "B", flipped: false, checked: false })
    };
    expect(handleCheckedCards(gameState)).toEqual(
      new Map()
        .set(1, { id: 1, content: "A", flipped: true, checked: true })
        .set(2, { id: 2, content: "B", flipped: false, checked: false })
        .set(3, { id: 3, content: "C", flipped: true, checked: true })
        .set(4, { id: 4, content: "C", flipped: true, checked: true })
        .set(5, { id: 5, content: "A", flipped: true, checked: true })
        .set(6, { id: 6, content: "B", flipped: false, checked: false })
    );
  });
});
