import { combineReducers } from "redux";
import CardSetsReducer from "./CardSetsReducer";

const reducer = combineReducers({
  cardSets: CardSetsReducer,
});
export default reducer;
