import { createAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AnyAction, Middleware } from "redux";

export interface ApiCallParams {
  url: string;
  onSuccess: string;
  onError?: string;
}

export const apiCall = createAction<ApiCallParams>("apiCall");

const apiMiddleware: Middleware =
  (store) => (next) => async (action: AnyAction) => {
    if (action.type != apiCall.type) return next(action);
    const payload = action.payload as ApiCallParams;
    const data = (await axios.get(payload.url)).data;
    store.dispatch({
      type: payload.onSuccess,
      payload: { data },
    });
    console.log(data);
    next(action);
  };
export default apiMiddleware;
