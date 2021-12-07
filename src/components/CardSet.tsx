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
      <div className="flex flex-row justify-between items-center">
        <h2 className="font-bold text-xl  text-left">{cardset.name}</h2>
        <i
          className="fa fa-edit fa-xl text-gray-700 px-4"
          onClick={(e) => {
            e.stopPropagation()
            navigate(`/cardset/edit/${cardset.id}`);
         }}
        ></i>
      </div>
      <h3 className="pb-4 text-xl text-left text-gray-500">{`${cardset.description}`}</h3>
      <h3 className="text-xl text-left text-gray-500">{`${cardset.count} terms`}</h3>
    </div>
  );
}

export default CardSetCard;
