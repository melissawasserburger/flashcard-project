import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { updateDeck, readDeck } from "../../utils/api";
import { Icon } from "@iconify/react";

export default function EditDeck({deckId}) {

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

    const history = useHistory();

    const [formData, setFormData] = useState({});

    useEffect(()=> {
        const initialFormState = {
            name: deck.name,
            description: deck.description,
            id: deck.id
        };
        setFormData(initialFormState)
    }, [deck]);

    const changeHandler = ({target}) => {
        setFormData({...formData, [target.name]: target.value});
    };

    function submitHandler(event) {
        event.preventDefault();
        const abortController = new AbortController();

        async function editDeck() {
            try {
                const deckData = await updateDeck(formData, abortController.signal);
                history.push(`/decks/${deckData.id}`);
            } catch (error) {
                if (error.name === "AbortError") {
                    console.info("aborted");
                } else {
                    throw error;
                };
            };
        };

        editDeck();

        return () => {
            abortController.abort();
        };
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
              Edit Deck
            </li>
          </ol>
        </nav>
      </div>

      <h1 className="col col-12">Edit Deck</h1>

        <div className="col col-12">
        <form onSubmit={submitHandler}>
          <label htmlFor="name" className="my-2">Name</label>
          <br />
          <input
            type="text"
            className="col col-12"
            name="name"
            id="name"
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
            onClick={() => history.push(`/decks/${deck.id}`)}
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
