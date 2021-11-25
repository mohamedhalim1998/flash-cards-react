import { configureStore } from "@reduxjs/toolkit";
import apiMiddleware from "../middleware/ApiMiddleware";
import reducer from "./Reducer";

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiMiddleware),
});
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
