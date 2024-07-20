import { combineReducers } from "redux";
import { getBooks } from "./book/booksReducer";

const rootReducer = combineReducers({
  getBooks,
});

export default rootReducer;
