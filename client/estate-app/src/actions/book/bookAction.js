import {
  GET_BOOKS_START,
  GET_BOOKS_SUCCESS,
  GET_BOOKS_FAILURE,
  // ADD_BOOK,
  // REMOVE_BOOK,
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

// export const actionAddBook = (dispatch, book) => {
//   dispatch({ type: ADD_BOOK, payload: book });
// };

// export const actionRemoveBook = (dispatch, id) => {
//   dispatch({ type: REMOVE_BOOK, payload: { id } });
// };
