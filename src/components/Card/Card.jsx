import React from "react";
import "./card.css";

function Card({ cards, allCards }) {
  return (
    <>
      <div className="allCards">
        <img src={allCards.image} />
        <div className="nameAndPrice">
          <p>{allCards.title}</p>
          <p>{allCards.price} $</p>
        </div>
      </div>
    </>
  );
}

export default Card;
