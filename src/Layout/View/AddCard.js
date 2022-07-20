import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { createCard,readDeck } from "../../utils/api";

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
  
    const history = useHistory();

//   function createNewId() {
//     let newId = Math.floor(Math.random() * 101);
//     for (let deck of deck.cards) {
//         if (newId === deck.id) {
//             newId = null;
//         }
//     }
//     return newId;
//     }

  const initialFormState = {
    front: "",
    back: "",
  };

  const [formData, setFormData] = useState(initialFormState);

  const changeHandler = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
        await createCard(deck.id, formData);
    } catch (error) {
        throw error;
    };
    setFormData(initialFormState);
  };

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
        <form onSubmit={submitHandler}>
          <label htmlFor="front">Front</label>
          <br />
          <textarea
            name="front"
            id="front"
            className="col col-12"
            placeholder="Front side of card"
            value={formData.front}
            onChange={changeHandler}
            required
            rows={2}
          ></textarea>
          <br />
          <label htmlFor="back">Back</label>
          <br />
          <textarea
            name="back"
            id="back"
            className="col col-12"
            placeholder="Back side of card"
            value={formData.back}
            onChange={changeHandler}
            required
            rows={2}
          ></textarea>
          <br />
          <button
            type="button"
            name="cancelBtn"
            className="my-2 mr-2 btn btn-secondary"
            onClick={() => history.push(`/decks/${deck.id}`)}
          >
            Done
          </button>
          <button type="submit" name="submitBtn" className="btn btn-primary">
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
