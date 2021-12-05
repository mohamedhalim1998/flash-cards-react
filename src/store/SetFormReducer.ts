import {
  createAction,
  createReducer,
  createSelector,
  PayloadAction,
} from "@reduxjs/toolkit";
import Card from "../data/Card";
import { RootState } from "./Store";

interface FormData {
  title: string;
  description: string;
  cards: Card[];
  cardsError?: string;
  titleError?: string;
  validForm?: boolean;
}

export const updateTitle = createAction<string>("updateTitle");
export const updateDescription = createAction<string>("updateDescription");
export const updateCardFront =
  createAction<{ index: number; value: string }>("updateCardFront");
export const updateCardBack =
  createAction<{ index: number; value: string }>("updateCardBack");
export const deleteCard = createAction<number>("deleteCard");
export const addCard = createAction("addCard");
export const updateTitleError = createAction("updateTitleError");
export const updateCardsError = createAction("updateCardsError");
export const reorderCard =
  createAction<{ source: number; dest: number }>("reorderCard");
export const validateForm = createAction("validateForm");

const initState: FormData = {
  title: "",
  description: "",
  cards: [
    { front: "", back: "" },
    { front: "", back: "" },
  ],
};
const emptyCard = (card: Card): boolean => card.back != "" && card.front != "";
export const getNoneEmptyCards = (): ((data: FormData) => Card[]) =>
  createSelector(
    (data: FormData) => data.cards,
    (cards: Card[]) => cards.filter(emptyCard)
  );
export default createReducer(initState, {
  [updateTitle.type]: (state, action: PayloadAction<string>) => {
    state.title = action.payload;
  },
  [updateDescription.type]: (state, action: PayloadAction<string>) => {
    state.description = action.payload;
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
  [addCard.type]: (state) => {
    state.cards.push({ front: "", back: "" });
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
  [validateForm.type]: (state) => {
    if (state.title === "") {
      state.titleError = "YOU NEED TO ENTER A TITLE";
    } else {
      state.titleError = undefined;
    }
    if (state.cards.filter(emptyCard).length < 2) {
      state.cardsError = "NEED AT LEAST TWO NON EMPTY CARDS";
    } else {
      state.cardsError = undefined;
    }
    state.validForm =
      state.cardsError === undefined && state.titleError === undefined;
  },
});
