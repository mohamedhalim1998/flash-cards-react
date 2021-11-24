import React from "react";

interface CardSetData {
  name: string;
  count: number;
}

function CardSet(cardset: CardSetData) {
  return (
    <div className="card cursor-pointer">
      <h2 className="py-8 px-4 font-bold text-xl  text-left">{cardset.name}</h2>
      <h2 className="px-4 text-xl text-left text-gray-500">{`${cardset.count} terms`}</h2>
    </div>
  );
}

export default CardSet;
