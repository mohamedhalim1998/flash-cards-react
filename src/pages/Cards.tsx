import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FlashCard from "../components/FlashCard";
import SideBar from "../components/SideBar";


import { getSetById, loadCardsFromSet } from "../store/CardSetsReducer";
import { useAppDispatch, useAppSelector } from "../store/hooks";

function Cards() {
  const navParam = useParams();
  const setId: number =
    navParam.id != undefined ? Number.parseInt(navParam.id) : 0;
  const dispatch = useAppDispatch();
  console.log("id: ", setId);
  const state = useAppSelector((state) => state);
  const cards = state.cardSets.cards;
  const cardSet = getSetById(setId)(state);
  const [currentCard, setCurrentCard] = useState<number>(0);
  useEffect(() => {
    dispatch(loadCardsFromSet(setId));
  }, []);
  console.log(cards);
  console.log(cardSet);
  return (
    <div className="w-3/5 pt-12 mx-auto grid grid-cols-4">
      <div className="mr-12">
        <h2 className="font-semibold text-4xl text-gray-800 text-left">
          {cardSet ? cardSet.name : "Java"}
        </h2>
        <SideBar />
      </div>
      <div className="h-96 col-span-3 flex flex-col justify-center">
        <FlashCard {...cards[currentCard]} />
      </div>
    </div>
  );
}

export default Cards;
