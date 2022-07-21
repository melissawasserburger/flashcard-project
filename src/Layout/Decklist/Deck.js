import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

// this component is a contains the HTML for each deck, displayed on Decklist
export default function Deck({ deck, deleteHandler }) {

  const { cards = [] } = deck;
  
  return (
    <div className="card my-2">
      <div className="card-body">
        <div className="d-flex row">
          <h5 className="col card-title">{deck.name}</h5>
          <h6 className="col text-right card-subtitle mb-2 text-muted">
            {cards.length} cards
          </h6>
        </div>
        <p className="card-text">{deck.description}</p>
        <div className="row d-flex justify-content-end">
          <Link to={`/decks/${deck.id}`} className="mx-2 mr-aut btn btn-secondary mr-2">
            <Icon icon="oi:eye" /> View
          </Link>
          <Link to={`/decks/${deck.id}/study`} className="mr-auto btn btn-primary">
            <Icon icon="oi:book" /> Study
          </Link>

          <button
            type="button"
            name="deleteBtn"
            className="mr-2 btn btn-danger"
            onClick={()=>deleteHandler(deck.id)}
          >
            <Icon icon="oi:trash" />
          </button>
        </div>
      </div>
    </div>
  );
}
