import { takeLatest } from "redux-saga/effects";
import { GET_BOOKS_START } from "../../actions/book/types";
import { getBooksSaga } from "./bookSaga";

function* watchBookSaga() {
  yield takeLatest(GET_BOOKS_START, getBooksSaga);
}

export default watchBookSaga;
