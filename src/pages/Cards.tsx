import React, { useEffect, useState } from "react";
import { TwinSpin } from "react-cssfx-loading/lib";
import { useParams } from "react-router-dom";
import CardsNavigation from "../components/CardsNavigation";
import FlashCard from "../components/FlashCard";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";

import {
  getSetById,
  loadCardsFromSet,
  updateCards,
} from "../store/CardSetsReducer";
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
    dispatch({
      type: updateCards.type,
      payload: {
        data: [],
      },
    });
    dispatch(loadCardsFromSet(setId));
  }, [dispatch]);
  //   console.log(cards);
  //   console.log(cardSet);
  if (!cardSet || cards.length == 0) {
    return (
      <div className="flex flex-row justify-center items-center h-screen container text-center mx-auto">
        <TwinSpin />
      </div>
    );
  }
  return (
    <div>
      <NavBar />

      <div className="w-3/5 pt-12 mx-auto grid grid-cols-4">
        <div className="mr-12">
          <h2 className="font-semibold text-4xl text-gray-800 text-left">
            {cardSet.name}
          </h2>
          <SideBar setId={cardSet.id} />
        </div>
        <div className="h-96 col-span-3 flex flex-col justify-center">
          <FlashCard {...cards[currentCard]} />
          <CardsNavigation
            onBack={() => {
              setCurrentCard(currentCard - 1);
            }}
            onNext={() => {
              setCurrentCard(currentCard + 1);
            }}
            current={currentCard + 1}
            size={cards.length}
          />
        </div>
      </div>
    </div>
  );
}

export default Cards;
