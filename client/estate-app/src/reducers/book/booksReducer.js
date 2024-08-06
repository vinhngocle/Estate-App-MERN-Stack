import {
  GET_BOOKS_START,
  GET_BOOKS_SUCCESS,
  GET_BOOKS_FAILURE,
  ADD_BOOK_START,
  ADD_BOOK_SUCCESS,
  ADD_BOOK_FAILURE,
} from "../../actions/book/types";

const initialState = {
  data: [],
  book: {},
  isLoading: false,
  error: null,
};

export const getBooks = (state = initialState, action) => {
  switch (action.type) {
    case GET_BOOKS_START: {
      return { ...state, isLoading: true };
    }
    case GET_BOOKS_SUCCESS: {
      return { ...state, isLoading: false, data: action.payload };
    }
    case GET_BOOKS_FAILURE: {
      return { ...state, isLoading: false, data: action.payload };
    }
    default:
      return state;
  }
};

export const addBook = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BOOK_START: {
      return { ...state, isLoading: true };
    }
    case ADD_BOOK_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        // book: action.payload,
        data: [...state.data, action.payload],
      };
    }
    case ADD_BOOK_FAILURE: {
      return {
        ...state,
        isLoading: false,
        // book: action.payload,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};
