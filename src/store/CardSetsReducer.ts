import { createAction, createReducer, PayloadAction } from "@reduxjs/toolkit";
import CardSet from "../data/CardSet";
import { apiCall } from "../middleware/ApiMiddleware";

export const updateSets = createAction("updateSets");
export const loadCardSets = () =>
  apiCall({
    url: "http://localhost:5000/cardset",
    onSuccess: updateSets.toString(),
  });

const initState = {
  sets: [] as CardSet[],
};

export default createReducer(initState, {
  [updateSets.type]: (state, action) => {
    state.sets = action.payload.data;
  },
});
