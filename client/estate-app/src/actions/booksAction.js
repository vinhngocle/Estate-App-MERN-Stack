export const GET_BOOKS = "REDUX_SAGA_GET_BOOKS";
export const ADD_BOOK = "REDUX_SAGA_ADD_BOOK";
export const REMOVE_BOOK = "REDUX_SAGA_REMOVE_BOOK";

export const actionGetBooks = (dispatch) => {
  dispatch({ type: GET_BOOKS });
};

export const actionAddBook = (dispatch, book) => {
  dispatch({ type: ADD_BOOK, payload: book });
};

export const actionRemoveBook = (dispatch, id) => {
  dispatch({ type: REMOVE_BOOK, payload: { id } });
};
