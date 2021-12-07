import {
  createAction,
  createReducer,
  createSelector,
  PayloadAction,
} from "@reduxjs/toolkit";
import Card from "../data/Card";
import { apiCall } from "../middleware/ApiMiddleware";
import { RootState } from "./Store";

interface FormData {
  setId?: number;
  title: string;
  description: string;
  cards: Card[];
  cardsError?: string;
  titleError?: string;
}

export const updateSetId = createAction<number>("updateSetId");
export const updateTitle = createAction<string>("updateTitle");
export const updateDescription = createAction<string>("updateDescription");
export const updateCards = createAction<Card[]>("updateCards");
export const updateCardFront =
  createAction<{ index: number; value: string }>("updateCardFront");
export const updateCardBack =
  createAction<{ index: number; value: string }>("updateCardBack");
export const deleteCard = createAction<number>("deleteCard");
export const addCard = createAction<Card>("addCard");
export const addNewCard = createAction("addNewCard");
export const updateTitleError = createAction<string | undefined>(
  "updateTitleError"
);
export const updateCardsError = createAction<string | undefined>(
  "updateCardsError"
);
export const reorderCard =
  createAction<{ source: number; dest: number }>("reorderCard");
export const fillCards = (setId: number) =>
  apiCall({
    url: `http://localhost:5000/card`,
    onSuccess: updateCards.toString(),
    params: {
      setId,
    },
  });

const initState: FormData = {
  title: "",
  description: "",
  cards: [],
};
const emptyCard = (card: Card): boolean => card.back != "" && card.front != "";
export const getNoneEmptyCards = (): ((data: FormData) => Card[]) =>
  createSelector(
    (data: FormData) => data.cards,
    (cards: Card[]) => cards.filter(emptyCard)
  );

export default createReducer(initState, {
  [updateSetId.type]: (state, action: PayloadAction<number>) => {
    state.setId = action.payload;
  },
  [updateTitle.type]: (state, action: PayloadAction<string>) => {
    state.title = action.payload;
  },
  [updateTitleError.type]: (state, action: PayloadAction<string>) => {
    state.titleError = action.payload;
  },
  [updateDescription.type]: (state, action: PayloadAction<string>) => {
    state.description = action.payload;
  },
  [updateCardsError.type]: (state, action: PayloadAction<string>) => {
    state.cardsError = action.payload;
  },
  [updateCards.type]: (state, action: PayloadAction<{ data: Card[] }>) => {
    state.cards = action.payload.data;
  },
  [updateCardFront.type]: (
    state,
    action: PayloadAction<{ index: number; value: string }>
  ) => {
    state.cards[action.payload.index].front = action.payload.value;
  },
  [updateCardBack.type]: (
    state,
    action: PayloadAction<{ index: number; value: string }>
  ) => {
    state.cards[action.payload.index].back = action.payload.value;
  },
  [addNewCard.type]: (state) => {
    state.cards.push({ front: "", back: "" });
  },
  [addCard.type]: (state, action: PayloadAction<Card>) => {
    state.cards.push(action.payload);
  },
  [deleteCard.type]: (state, action: PayloadAction<number>) => {
    state.cards.splice(action.payload, 1);
  },
  [reorderCard.type]: (
    state,
    action: PayloadAction<{ source: number; dest: number }>
  ) => {
    const [reorderedItem] = state.cards.splice(action.payload.source, 1);
    state.cards.splice(action.payload.dest, 0, reorderedItem);
  },
});
