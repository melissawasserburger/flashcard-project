import React, { useState, useEffect } from "react";
import { Link, Switch, Route, useHistory } from "react-router-dom";
import { Icon } from "@iconify/react";
import { listDecks, deleteDeck } from "../utils/api";
import CreateDeck from "./CreateDeck";
import Decklist from "./Decklist/Decklist";
import Study from "./Study/Study";
import ViewDeck from "./View/ViewDeck";
import NotFound from "./NotFound";

export default function Home() {
  const history = useHistory();

  const [decks, setDecks] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();

    async function loadDecks() {
      try {
        const deckData = await listDecks(abortController.signal);
        setDecks(deckData);
      } catch (error) {
        if (error.name !== "AbortError") {
          throw error;
        }
      }
    }

    loadDecks();

    return () => abortController.abort();
  }, []);

  const deleteDeckHandler = async (deckId) => {
    window.confirm("Delete this deck?\n\nYou will not be able to recover it.");
    await deleteDeck(deckId);
    setDecks(() => decks.filter((deck) => deck.id !== deckId));
    history.push("/");
  };

  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Link to="/decks/new" className="btn btn-secondary">
            <Icon icon="oi:plus" /> Create Deck
          </Link>
          <Decklist decks={decks} deleteHandler={deleteDeckHandler} />
        </Route>
        <Route exact path="/decks/new">
          <CreateDeck decks={decks} setDecks={setDecks} />
        </Route>
        <Route path="/decks/:deckId/study">
          <Study />
        </Route>
        <Route path="/decks/:deckId">
          <ViewDeck
            deleteHandler={deleteDeckHandler}
            decks={decks}
            setDecks={setDecks}
          />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}
