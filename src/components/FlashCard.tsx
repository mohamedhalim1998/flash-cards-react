import React, { useState } from "react";
import Card from "../data/Card";

function FlashCard(card: Card) {
  const [flip, setFlip] = useState<boolean>(false);
  const [cardText, setCardText] = useState<string>(card.front);
  return (
    <div
      className={`card mx-12 h-4/6 text-center align-middle flex flex-col justify-center my-0 cursor-pointer ${
        flip ? "flip-card" : ""
      }`}
      onClick={(e) => {
        setFlip(true);
        const next = cardText === card.front ? card.back : card.front;
        setTimeout(() => {
          setCardText(next);
        }, 200);
        setTimeout(() => {
          setFlip(false);
        }, 500);
      }}
    >
      <div
        className={`text-2xl text-gray-700 font-semibold flip ? "flip-text" : ""
      }`}
      >
        {cardText}
      </div>
    </div>
  );
}

export default FlashCard;
