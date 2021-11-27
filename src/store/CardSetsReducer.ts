import { createAction, createReducer, PayloadAction } from "@reduxjs/toolkit";
import Card from "../data/Card";
import CardSet from "../data/CardSet";
import { apiCall } from "../middleware/ApiMiddleware";

export const updateSets = createAction("updateSets");
export const loadCardSets = () =>
  apiCall({
    url: "http://localhost:5000/cardset",
    onSuccess: updateSets.toString(),
  });

export const createCardSet = (name: string, cards: Card[]) =>
  apiCall({
    url: "http://localhost:5000/cardset/add",
    method: "POST",
    onSuccess: updateSets.toString(),
    params: {
      data: { name, cards },
    },
  });

const initState = {
  sets: [] as CardSet[],
};

export default createReducer(initState, {
  [updateSets.type]: (state, action) => {
    state.sets = action.payload.data;
  },
});
