import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import Card from "./Card";
import NotEnough from "./NotEnough";
import { readDeck } from "../../utils/api";
import { Icon } from "@iconify/react";

// this component is responsible for loading current deck, displaying cards
// path = "/decks/:deckId/study"
export default function Study() {
  const { deckId } = useParams();
  const history = useHistory();

  const [deck, setDeck] = useState({ cards: [] });
  const [currentCardId, setCurrentCardId] = useState(0); //this will track which card is displayed
  const [cardSide, setCardSide] = useState(true); //true will display front, false will display back

  // loads the current Deck object {id, name, description, cards: []}
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

    loadDeck();

    return () => abortController.abort();
  }, [deckId]);

  const flipHandler = () => {
    setCardSide(!cardSide);
  };

  
  const nextHandler = (cardId) => {
    if (cardId >= deck.cards.length -1) {
      if (
        window.confirm(
          "Restart cards?\n\nClick cancel to return to the home screen."
        )
      ) {
        setCurrentCardId(0); // sets cardId to 0 --> arr cards[0]
        setCardSide(true); // flips to front side
      } else {
        history.push("/");
      }
    } else {
        setCurrentCardId(cardId + 1);
        setCardSide(true);
    }
  };

  return (
    <div className="row">
      <div className="col col-12">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">
                <Icon icon="oi:home" /> Home
              </Link>
            </li>
            <li className="breadcrumb-item">
              <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Study
            </li>
          </ol>
        </nav>
      </div>

      <h1 className="col col-12">Study: {deck.name}</h1>

      <div className="col col-12">
        {deck.cards.length > 2 ? (
          <Card
            deck={deck}
            cardId={currentCardId}
            nextHandler={nextHandler}
            flipHandler={flipHandler}
            cardSide={cardSide}
          />
        ) : (
          <NotEnough deckId={deck.id}/>
        )}
      </div>
    </div>
  );
}
