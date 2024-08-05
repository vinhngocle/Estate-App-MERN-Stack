import { takeLatest } from "redux-saga/effects";
import { GET_BOOKS_START, ADD_BOOK_START } from "../../actions/book/types";
import { getBooksSaga, addBooksSaga } from "./bookSaga";

function* watchBookSaga() {
  yield takeLatest(GET_BOOKS_START, getBooksSaga);
  yield takeLatest(ADD_BOOK_START, addBooksSaga);
}

export default watchBookSaga;
