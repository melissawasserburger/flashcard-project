import React from "react";
import Deck from "./Deck";

// this component is responsible for listing all decks
// deck card components are created in Deck.js
// path ="/"
export default function Decklist({ decks, deleteHandler}) {

  const decklist = decks.map((deck, index) => {
    return <Deck deck={deck} key={index} deleteHandler={deleteHandler}/>;
  });

  return (
      <div>{decklist}</div>
  );
}
