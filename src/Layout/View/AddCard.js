import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { readDeck } from "../../utils/api";
import CardForm from "./CardForm";



export default function AddCard({ deckId }) {
    const [deck, setDeck] = useState({ cards: []});

    useEffect(()=> {
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
        };
        
        loadDeck();

        return ()=> abortController.abort();
    }, [deckId]);

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
              Add Card
            </li>
          </ol>
        </nav>
      </div>

      <h2 className="col col-12">{deck.name}: Add Card</h2>

      <div className="col col-12">
        <CardForm deck={deck} setDeck={setDeck}/>
      </div>
    </div>
  );
}
