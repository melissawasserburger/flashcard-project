import React from "react";

// this component contains the HTML for each card in study mode, displayed on Study
export default function Card({
  deck = { cards: [] },
  cardId = 0,
  nextHandler,
  flipHandler,
  cardSide
}) {

  const { cards } = deck;
  const card = cards[cardId] || {};

  const frontSideHtml = (
    <div>
      <div className="my-2 card">
        <div className="card-body">
          <h5 className="card-title">
            Card {cardId + 1} of {deck.cards.length}
          </h5>
          <p className="card-text">{card.front}</p>
          <button
            type="button"
            name="flipBtn"
            className="px-4 btn btn-secondary"
            onClick={flipHandler}
          >
            Flip
          </button>
        </div>
      </div>
    </div>
  );

  const backSideHtml = (
    <div>
      <div className="my-2 card">
        <div className="card-body">
          <h5 className="card-title">
            Card {cardId + 1} of {deck.cards.length}
          </h5>

          <p className="card-text">{card.back}</p>

          <button
            type="button"
            name="flipBtn"
            className="px-4 btn btn-secondary"
            onClick={flipHandler}
          >
            Flip
          </button>
          <button
            type="button"
            name="nextBtn"
            className="px-3 ml-2 btn btn-primary"
            onClick={() => nextHandler(cardId)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );

  return <div>{cardSide ? frontSideHtml : backSideHtml}</div>;
}
