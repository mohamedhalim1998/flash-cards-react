import React, { useEffect, useState } from "react";
import Card, { cardColors } from "../data/Card";

function FlashCard(card: Card) {
  const [flip, setFlip] = useState<boolean>(false);
  const [cardText, setCardText] = useState<string>(card.front);
  useEffect(() => setCardText(card.front), [card]);
  return (
    <div
      className={`card mx-12 h-4/6 text-center align-middle flex flex-col justify-center my-0 cursor-pointer ${
        flip ? "flip-card" : ""
      }`}
      style={{background: card.color ? card.color : cardColors[0]}}
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
