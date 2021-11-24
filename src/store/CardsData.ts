import { createAction, createReducer, PayloadAction } from "@reduxjs/toolkit";

export const testAction = createAction("testAction");

const initState = {
  test: "none",
};

export default createReducer(initState, {
  [testAction.type]: (state, action: PayloadAction<any>) => {
    console.log(action.payload.test);
    state.test = action.payload.test;
  },
});
