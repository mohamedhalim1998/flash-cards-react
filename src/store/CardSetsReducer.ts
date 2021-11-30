import {
  createAction,
  createReducer,
  createSelector,
  PayloadAction,
} from "@reduxjs/toolkit";
import Card from "../data/Card";
import CardSet from "../data/CardSet";
import { apiCall } from "../middleware/ApiMiddleware";
import { RootState } from "./Store";

export const updateLoading = createAction<boolean>("updateLoading");
export const updateSets = createAction("updateSets");
export const updateCards = createAction("updateCards");
export const loadCardSets = () =>
  apiCall({
    url: "http://localhost:5000/cardset",
    onSuccess: updateSets.toString(),
  });

export const createCardSet = (
  name: string,
  description: string,
  cards: Card[]
) =>
  apiCall({
    url: "http://localhost:5000/cardset/add",
    method: "POST",
    onSuccess: loadCardSets.toString(),
    params: {
      data: { name, description, cards },
    },
  });

export const loadCardsFromSet = (setId: number) =>
  apiCall({
    url: `http://localhost:5000/card`,
    onSuccess: updateCards.toString(),
    params: {
      setId,
    },
  });

export const getSetById = (id: number): ((state: RootState) => CardSet) =>
  createSelector(
    (state: RootState) => state.cardSets.sets,
    (sets: CardSet[]) => sets.filter((set) => set.id === id)[0]
  );

const initState = {
  loading: false,
  sets: [] as CardSet[],
  cards: [] as Card[],
};

export default createReducer(initState, {
  [updateLoading.type]: (state, action) => {
    state.loading = action.payload;
  },
  [updateSets.type]: (state, action) => {
    state.sets = action.payload.data;
  },
  [updateCards.type]: (state, action) => {
    state.cards = action.payload.data;
  },
});
