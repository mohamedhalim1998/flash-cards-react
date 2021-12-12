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
export const updateQuery = createAction<string>("updateQuery");
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

export const editCardSet = (
  setId: number,
  name: string,
  description: string,
  cards: Card[]
) =>
  apiCall({
    url: "http://localhost:5000/cardset/update",
    method: "POST",
    onSuccess: loadCardSets.toString(),
    params: {
      data: { setId, name, description, cards },
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

export const filterSets = (sets: CardSet[], query: string): CardSet[] =>
  sets.filter(
    (set) => set.name.includes(query) || set.description?.includes(query)
  );

const initState = {
  loading: false,
  query: "",
  sets: [] as CardSet[],
  cards: [] as Card[],
};

export default createReducer(initState, {
  [updateLoading.type]: (state, action) => {
    state.loading = action.payload;
  },
  [updateQuery.type]: (state, action) => {
    state.query = action.payload;
  },
  [updateSets.type]: (state, action) => {
    state.sets = action.payload.data;
  },
  [updateCards.type]: (state, action) => {
    state.cards = action.payload.data;
  },
});
