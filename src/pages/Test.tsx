import React, { useEffect, useState } from "react";
import { TwinSpin } from "react-cssfx-loading/lib";
import { Link, useParams } from "react-router-dom";
import CardQuestion from "../components/CardQuestion";
import LearnBar from "../components/LearnBar";
import Card from "../data/Card";

import {
  getSetById,
  updateCards,
  loadCardsFromSet,
} from "../store/CardSetsReducer";
import { useAppDispatch, useAppSelector } from "../store/hooks";

function Learn() {
  const navParam = useParams();
  const setId: number =
    navParam.id != undefined ? Number.parseInt(navParam.id) : 0;
  const dispatch = useAppDispatch();
  console.log("id: ", setId);
  const state = useAppSelector((state) => state);
  let cards = state.cardSets.cards;
  const cardSet = getSetById(setId)(state);
  useEffect(() => {
    dispatch(loadCardsFromSet(setId));
    return () => {
      dispatch({
        type: updateCards.type,
        payload: {
          data: [],
        },
      });
    };
  }, []);

  if (!cardSet || cards.length == 0) {
    return (
      <div className="flex flex-row justify-center items-center h-screen container text-center mx-auto">
        <TwinSpin />
      </div>
    );
  }
  return (
    <div className=" font-mono">
      <LearnBar setTitle={cardSet.name} />
      <CardQuestion cards={cards} />
    </div>
  );
}

export default Learn;
