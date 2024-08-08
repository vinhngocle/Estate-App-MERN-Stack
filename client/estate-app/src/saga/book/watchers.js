import { takeEvery } from "redux-saga/effects";
import {
  GET_BOOKS_START,
  ADD_BOOK_START,
  REMOVE_BOOK_START,
  UPDATE_BOOK_START,
} from "../../actions/book/types";
import {
  getBooksSaga,
  addBooksSaga,
  removeBooksSaga,
  updateBooksSaga,
} from "./bookSaga";

function* watchBookSaga() {
  yield takeEvery(GET_BOOKS_START, getBooksSaga);
  yield takeEvery(ADD_BOOK_START, addBooksSaga);
  yield takeEvery(REMOVE_BOOK_START, removeBooksSaga);
  yield takeEvery(UPDATE_BOOK_START, updateBooksSaga);
}

export default watchBookSaga;
