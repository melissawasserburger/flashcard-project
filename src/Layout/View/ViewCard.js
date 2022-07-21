import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";


// this component contains the HTML for each card, displayed on ViewDeck
export default function ViewCard({ card, deleteHandler, deckId }) {
  return (
    <div className="row my-2">
      <div className="col col-12">
        <div className="card">
          <div className="d-flex flex-row">
            <div className="col col-6 card-body">{card.front}</div>

            <div className="col col-6 card-body">{card.back}</div>
          </div>
          <div className="d-flex my-2">
            <Link to={`/decks/${deckId}/cards/${card.id}/edit`} className="ml-auto btn btn-secondary">
              <Icon icon="oi:pencil" /> Edit
            </Link>
            <button
              type="button"
              name="deleteBtn"
              className="justify-content-end mx-2 btn btn-danger"
              onClick={() => deleteHandler(card.id)}
            >
              <Icon icon="oi:trash" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
