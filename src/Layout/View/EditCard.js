import React, { useState, useEffect } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { readCard, readDeck, updateCard } from "../../utils/api";

// this component allows the user to edit individual cards
// path = "/decks/:deckId/cards/:cardId/edit"
export default function EditCard() {
  const { deckId, cardId } = useParams();
  const history = useHistory();

  const [deck, setDeck] = useState({});
  const [card, setCard] = useState({});
  const [formData, setFormData] = useState({});

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
        setFormData({ front: cardData.front, back: cardData.back });
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

  const changeHandler = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
  };

  async function submitHandler(card) {
    try {
      await updateCard(card);
      history.push(`/decks/${deckId}`);
    } catch (error) {
      throw error;
    }
  }

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
        <form onSubmit={submitHandler}>
          <label htmlFor="front" className="my-2">
            Front
          </label>
          <br />
          <textarea
            className="col col-12"
            name="front"
            id="front"
            value={formData.front}
            onChange={changeHandler}
            required
          ></textarea>
          <br />

          <label htmlFor="description" className="my-2">
            Back
          </label>
          <br />
          <textarea
            className="col col-12"
            name="back"
            id="back"
            value={formData.back}
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
          <button type="submit" name="submitBtn" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
