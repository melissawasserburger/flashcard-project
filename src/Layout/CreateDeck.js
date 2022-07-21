import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../utils/api";
import { Icon } from "@iconify/react";

// this component contains form for creating new decks
// path = "/decks/new"
export default function CreateDeck({ decks, setDecks }) {
  const history = useHistory();

    function createNewId() {
        let newId = Math.floor(Math.random() * 101);
        for (let deck of decks) {
            if (newId === deck.id) {
                newId = null;
            }
        }
        return newId;
        }

  const initialFormState = {
    name: "",
    description: "",
    id: createNewId()
  };

  const [formData, setFormData] = useState(initialFormState);

  const changeHandler = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const abortController = new AbortController();

    async function callCreateDeck() {
      try {
        const deckData = await createDeck(formData, abortController.signal);
        setDecks([...decks, formData]);
        history.push(`/decks/${deckData.id}`); 
      } catch (error) {
        if (error.name !== "AbortError") {
          throw error
        }
      };
    };

    callCreateDeck();

    return () => {
      abortController.abort();
    };
  }

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
            <li className="breadcrumb-item active" aria-current="page">
              Create Deck
            </li>
          </ol>
        </nav>
      </div>

      <h1 className="col col-12">Create Deck</h1>

      <div className="col col-12">
        <form onSubmit={submitHandler}>
          <label htmlFor="name" className="my-2">Name</label>
          <br />
          <input
            type="text"
            className="col col-12"
            name="name"
            id="name"
            placeholder="Deck Name"
            value={formData.name}
            onChange={changeHandler}
            required
          ></input>
          <br />

          <label htmlFor="description" className="my-2">Description</label>
          <br />
          <textarea
            className="col col-12"
            name="description"
            id="description"
            placeholder="Brief description of the deck"
            value={formData.description}
            onChange={changeHandler}
            rows={3}
            required
          ></textarea>
          <br />
          <button
            type="button"
            name="cancelBtn"
            className="my-2 mr-2 btn btn-secondary"
            onClick={() => history.push("/")}
          >
            Cancel
          </button>
          <button
            type="submit"
            name="submitBtn"
            className="btn btn-primary"
            >Submit</button>
        </form>
      </div>
    </div>
  );
}
