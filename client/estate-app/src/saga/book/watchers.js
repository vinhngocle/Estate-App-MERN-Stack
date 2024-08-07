import { takeEvery, takeLatest } from "redux-saga/effects";
import {
  GET_BOOKS_START,
  ADD_BOOK_START,
  REMOVE_BOOK_START,
} from "../../actions/book/types";
import { getBooksSaga, addBooksSaga, removeBooksSaga } from "./bookSaga";

function* watchBookSaga() {
  yield takeEvery(GET_BOOKS_START, getBooksSaga);
  yield takeEvery(ADD_BOOK_START, addBooksSaga);
  yield takeEvery(REMOVE_BOOK_START, removeBooksSaga);
}

export default watchBookSaga;
