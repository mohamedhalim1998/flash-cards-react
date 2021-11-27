import { createAction } from "@reduxjs/toolkit";
import axios, { Method } from "axios";
import { AnyAction, Middleware } from "redux";

export interface ApiCallParams {
  url: string;
  method?: Method;
  onSuccess: string;
  onError?: string;
  params?: object;
}

export const apiCall = createAction<ApiCallParams>("apiCall");

const apiMiddleware: Middleware =
  (store) => (next) => async (action: AnyAction) => {
    if (action.type != apiCall.type) return next(action);
    const payload = action.payload as ApiCallParams;
    const data = (
      await axios.request({
        url: payload.url,
        params: payload.params,
        method: payload.method ? payload.method : "GET",
      })
    ).data;
    store.dispatch({
      type: payload.onSuccess,
      payload: { data },
    });
    console.log(data);
    next(action);
  };
export default apiMiddleware;
