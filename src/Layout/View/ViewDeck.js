import React, { useState, useEffect, useCallback } from "react";
import {
  useParams,
  useRouteMatch,
  Link,
  Switch,
  Route,
} from "react-router-dom";
import { readDeck, deleteCard } from "../../utils/api";
import { Icon } from "@iconify/react";
import ViewCard from "./ViewCard";
import EditDeck from "./EditDeck";
import AddCard from "./AddCard";
import NotFound from "../NotFound";
import EditCard from "./EditCard";

// this component loads the selected deck and provides Switch/Routes for functionalities
// path = "/decks/:deckId"
export default function ViewDeck({ deleteHandler, decks, setDecks }) {
  const { deckId } = useParams();
  const { url } = useRouteMatch();

  const [deck, setDeck] = useState({ cards: [] });

  const getDeckDetails = useCallback(async () => {
    try {
      const deckData = await readDeck(deckId);
      setDeck(deckData);
    } catch (error) {
      setDeck({ name: "Not Found" });
    }
  }, [deckId]);

  useEffect(() => {
    getDeckDetails();
  }, [deckId, getDeckDetails, deck.cards]);

  async function deleteCardHandler(cardId) {
    if (
      window.confirm("Delete this card?\n\nYou will not be able to recover it.")
    ) {
      await deleteCard(cardId);
      getDeckDetails();
    }
  }

  const cardlist = deck.cards.map((card, index) => {
    return (
      <ViewCard key={index} card={card} deleteHandler={deleteCardHandler} deckId={deck.id} />
    );
  });

  return (
    <Switch>
      <Route exact path={url}>
        <div className="row">
          <div className="col col-12">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  {deck.name}
                </li>
              </ol>
            </nav>
          </div>

          <div className="col col-12">
            <div className="card border-0">
              <div className="card-body">
                <h5 className="card-title">{deck.name}</h5>
                <p className="card-text">{deck.description}</p>
                <div className=" row d-flex">
                  <Link
                    to={`/decks/${deck.id}/edit`}
                    className="btn btn-secondary"
                  >
                    <Icon icon="oi:pencil" /> Edit
                  </Link>
                  <Link
                    to={`/decks/${deck.id}/study`}
                    className="mx-2 btn btn-primary"
                  >
                    <Icon icon="oi:book" /> Study
                  </Link>
                  <Link
                    to={`/decks/${deck.id}/cards/new`}
                    className="mr-auto btn btn-primary"
                  >
                    <Icon icon="oi:plus" /> Add Cards
                  </Link>
                  <button
                    type="button"
                    name="deleteBtn"
                    onClick={() => deleteHandler(deck.id)}
                    className="justify-content-end btn btn-danger"
                  >
                    <Icon icon="oi:trash" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <h2 className="col col-12">Cards</h2>

          <div className="col col-12 my-2">{cardlist}</div>
        </div>
        
      </Route>
      <Route path={`${url}/edit`}>
        <EditDeck deckId={deck.id} decks={decks} setDecks={setDecks}/>
      </Route>
      <Route path={`${url}/cards/new`}>
        <AddCard decks={decks} setDecks={setDecks} deckId={deck.id} />
      </Route>
      <Route path={`/decks/:deckId/cards/:cardId/edit`}>
        <EditCard />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}
