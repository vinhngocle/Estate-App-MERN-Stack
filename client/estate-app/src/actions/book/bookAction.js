import {
  GET_BOOKS_START,
  GET_BOOKS_SUCCESS,
  GET_BOOKS_FAILURE,
  ADD_BOOK_START,
  ADD_BOOK_SUCCESS,
  ADD_BOOK_FAILURE,
  REMOVE_BOOK_START,
  REMOVE_BOOK_SUCCESS,
  REMOVE_BOOK_FAILURE,
} from "./types";

export const getBooks = () => ({ type: GET_BOOKS_START });
export const getBooksSuccess = (payload) => ({
  type: GET_BOOKS_SUCCESS,
  payload,
});
export const getBooksFailure = (payload) => ({
  type: GET_BOOKS_FAILURE,
  payload,
});

export const addBook = (payload) => ({
  type: ADD_BOOK_START,
  payload,
});
export const addBookSuccess = (payload) => ({
  type: ADD_BOOK_SUCCESS,
  payload,
});

export const addBookFailure = (payload) => ({
  type: ADD_BOOK_FAILURE,
  payload,
});

export const removeBook = (payload) => ({ type: REMOVE_BOOK_START, payload });
export const removeBookSuccess = (payload) => ({
  type: REMOVE_BOOK_SUCCESS,
  payload,
});

export const removeBookFailure = (payload) => ({
  type: REMOVE_BOOK_FAILURE,
  payload,
});
