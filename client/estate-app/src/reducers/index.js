import { combineReducers } from "redux";
import { getBooks, addBook } from "./book/booksReducer";

const rootReducer = combineReducers({
  getBooks,
  addBook,
});

export default rootReducer;
