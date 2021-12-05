import { combineReducers } from "redux";
import CardSetsReducer from "./CardSetsReducer";
import SetFormReducer from "./SetFormReducer";

const reducer = combineReducers({
  cardSets: CardSetsReducer,
  cardSetForm: SetFormReducer
});
export default reducer;
