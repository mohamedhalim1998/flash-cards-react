import React from "react";
import { useNavigate } from "react-router";
import CardSet from "../data/CardSet";

function CardSetCard(cardset: CardSet) {
  const navigate = useNavigate();
  return (
    <div
      className="card cursor-pointer"
      onClick={(e) => {
        navigate(`/cardset/${cardset.id}`);
      }}
    >
      <h2 className="px-4 font-bold text-xl  text-left">{cardset.name}</h2>
      <h3 className="pb-4 px-4 text-xl text-left text-gray-500">{`${cardset.description}`}</h3>
      <h3 className="px-4 text-xl text-left text-gray-500">{`${cardset.count} terms`}</h3>
    </div>
  );
}

export default CardSetCard;
