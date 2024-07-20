import { call, put } from "redux-saga/effects";
// import { GET_BOOKS } from "../actions/booksAction";
import { GET_BOOKS_SUCCESS, GET_BOOKS_FAILURE } from "../../actions/book/types";

function booksFetch() {
  return fetch("http://localhost:3500/Books").then((response) =>
    response.json()
  );
}

export function* getBooksSaga() {
  try {
    const books = yield call(booksFetch);
    yield put({ type: GET_BOOKS_SUCCESS, payload: books });
  } catch (error) {
    yield put({ type: GET_BOOKS_FAILURE, payload: error.message });
  }
}
