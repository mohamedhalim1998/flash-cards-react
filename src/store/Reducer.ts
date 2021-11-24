import { combineReducers } from "redux";
import CardsData from "./CardsData";

const reducer = combineReducers({
  cardsData: CardsData,
});
export default reducer;
