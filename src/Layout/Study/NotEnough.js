import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

export default function NotEnough({ deckId }) {
  return (
    <div>
      <h2>Not enough cards.</h2>
      <p>You need at least 2 cards to study.</p>
      <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary">
        <Icon icon="oi:home" /> Add Cards
      </Link>
    </div>
  );
}
