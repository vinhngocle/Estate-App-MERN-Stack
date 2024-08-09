import { call, put } from "redux-saga/effects";
import BookService from "../../services/bookService";
// import { GET_BOOKS } from "../actions/booksAction";
import {
  GET_BOOKS_SUCCESS,
  GET_BOOKS_FAILURE,
  ADD_BOOK_SUCCESS,
  ADD_BOOK_FAILURE,
  UPDATE_BOOK_SUCCESS,
  UPDATE_BOOK_FAILURE,
} from "../../actions/book/types";
// import { books } from "../../__mock__/books";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// let books = [];

// function getBooks() {
//   return axios
//     .get("http://localhost:4000/book")
//     .then((res) => res.data)
//     .catch((err) => {
//       console.log(err);
//     });
// }

// function addBook(obj) {
//   return axios.post("http://localhost:4000/book", obj);
// }

export function* getBooksSaga(action) {
  try {
    const response = yield call(BookService.getBooks, action.payload);
    yield put({ type: GET_BOOKS_SUCCESS, payload: response });
  } catch (error) {
    yield put({ type: GET_BOOKS_FAILURE, payload: error.message });
  }
}

export function* addBooksSaga(action) {
  try {
    const response = yield call(BookService.createBook, action.payload);
    yield put({ type: ADD_BOOK_SUCCESS, payload: response });

    // Fetch the updated list of books after adding the new book
    const pagination = { page: 1, take: action.payload.take || 5 }; // Adjust as needed
    yield call(getBooksSaga, { payload: pagination });
  } catch (error) {
    yield put({ type: ADD_BOOK_FAILURE, payload: error.message });
  }
}

export function* removeBooksSaga(action) {
  try {
    const response = yield call(BookService.removeBook, action.payload);
    yield put({ type: ADD_BOOK_SUCCESS, payload: response });

    // Fetch the updated list of books after delete the new book
    const pagination = { page: 1, take: action.payload.take || 5 }; // Adjust as needed
    yield call(getBooksSaga, { payload: pagination });
  } catch (error) {
    yield put({ type: ADD_BOOK_FAILURE, payload: error.message });
  }
}

export function* updateBooksSaga(action) {
  try {
    const response = yield call(
      BookService.updateBook,
      action.payload.id,
      action.payload
    );
    yield put({ type: UPDATE_BOOK_SUCCESS, payload: response });

    const pagination = {
      page: action.payload.take || 1,
      take: action.payload.take || 5,
    }; // Adjust as needed
    yield call(getBooksSaga, { payload: pagination });
  } catch (error) {
    yield put({ type: UPDATE_BOOK_FAILURE, payload: error.message });
  }
}
