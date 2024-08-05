import { call, put } from "redux-saga/effects";
// import { GET_BOOKS } from "../actions/booksAction";
import {
  GET_BOOKS_SUCCESS,
  GET_BOOKS_FAILURE,
  ADD_BOOK_SUCCESS,
  ADD_BOOK_FAILURE,
} from "../../actions/book/types";
import { books } from "../../__mock__/books";

// let books = [];

function getLocalStorage() {
  const getbooks = localStorage.getItem("books");
  return JSON.parse(getbooks);
}

function booksFetch() {
  // return fetch("http://localhost:3500/Books").then(
  //   (response) => (books = response.json())
  // );
  localStorage.setItem("books", JSON.stringify(books));
  return getLocalStorage();
}

function addBook(obj) {
  let booksLocal = getLocalStorage();
  console.log("book local", booksLocal);
  booksLocal.push({ ...obj, id: books.length + 1 });
  // localStorage.setItem("books", JSON.stringify(booksLocal));
  return booksLocal;
}

export function* getBooksSaga() {
  try {
    // books = yield call(booksFetch);
    const books = booksFetch();
    yield put({ type: GET_BOOKS_SUCCESS, payload: books });
  } catch (error) {
    yield put({ type: GET_BOOKS_FAILURE, payload: error.message });
  }
}

export function* addBooksSaga(action) {
  try {
    // const book = yield call(addBook, action.payload);
    const updatedBooks = addBook(action.payload);
    yield put({ type: ADD_BOOK_SUCCESS, payload: updatedBooks });
    yield call(getBooksSaga);
    // console.log("books", books);
  } catch (error) {
    yield put({ type: ADD_BOOK_FAILURE, payload: error.message });
  }
}
