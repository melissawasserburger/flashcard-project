import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { readCard, updateCard, createCard } from "../../utils/api";

export default function CardForm({ deck, cardId, setDeck }) {
  const history = useHistory();

    // form state for add card --> will be replaced if pre-existing card loads
    const initialFormState = {
        front: "",
        back: ""
    };

    const [existingCard, setExistingCard] = useState({});
    const [formData, setFormData] = useState(initialFormState);

    useEffect(()=> {
        const abortController = new AbortController();

        if(cardId) {
            async function loadCard() {
            const cardData = await readCard(cardId, abortController.signal);
            setExistingCard(cardData);
            setFormData({deckId: deck.id, id: cardData.id, front: cardData.front, back: cardData.back})
        }

        loadCard();
    }

        return () => abortController.abort();
    }, [cardId, deck]);


    const changeHandler = ({ target }) => {
        setFormData({ ...formData, [target.name]: target.value });
      };

      const submitHandler = (event) => {
        event.preventDefault();

        if(existingCard.id) {
            updateCard(formData);
            history.push(`/decks/${deck.id}`);
        } else {
            createCard(deck.id, formData);
            setDeck({...deck, cards: [...deck.cards, formData]});
        }

        setFormData(initialFormState);
      }

  return (
    <div>
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
  );
}
