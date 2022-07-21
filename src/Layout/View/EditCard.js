import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { readCard, readDeck } from "../../utils/api";
import CardForm from "./CardForm";

// this component allows the user to edit individual cards
// path = "/decks/:deckId/cards/:cardId/edit"
export default function EditCard() {
  const { deckId, cardId } = useParams();

  const [deck, setDeck] = useState({});
  const [card, setCard] = useState({});

  useEffect(() => {
    const abortController = new AbortController();
    async function loadDeck() {
      try {
        const deckData = await readDeck(deckId, abortController.signal);
        setDeck(deckData);
      } catch (error) {
        if (error.name !== "AbortError") {
          throw error;
        }
      }
    }
    async function loadCard() {
      try {
        const cardData = await readCard(cardId, abortController.signal);
        setCard(cardData);
      } catch (error) {
        if (error.name !== "AbortError") {
          throw error;
        }
      }
    }

    loadDeck();
    loadCard();

    return () => abortController.abort();
  }, [deckId, cardId]);



  return (
    <div className="row">
      <div className="col col-12">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Edit Card {card.id}
            </li>
          </ol>
        </nav>
      </div>

      <h1 className="col col-12">Edit Card</h1>

      <div className="col col-12">
        <CardForm deck={deck} cardId={cardId} setDeck={setDeck} />
      </div>
    </div>
  );
}
