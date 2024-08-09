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
  UPDATE_BOOK_START,
  UPDATE_BOOK_SUCCESS,
  UPDATE_BOOK_FAILURE,
} from "../../actions/book/types";

const initialState = {
  data: [],
  book: {},
  meta: {},
  isLoading: false,
  error: null,
};

export const getBooks = (state = initialState, action) => {
  switch (action.type) {
    case GET_BOOKS_START: {
      return { ...state, isLoading: true };
    }
    case GET_BOOKS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        data: action.payload.data,
        meta: action.payload.meta,
      };
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
        book: action.payload,
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

export const removeBook = (state = initialState, action) => {
  switch (action.type) {
    case REMOVE_BOOK_START: {
      return { ...state, isLoading: true };
    }
    case REMOVE_BOOK_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        book: action.payload,
        data: [...state.data, action.payload],
      };
    }
    case REMOVE_BOOK_FAILURE: {
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

export const updateBook = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_BOOK_START: {
      return { ...state, isLoading: true };
    }
    case UPDATE_BOOK_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        book: action.payload,
        data: [...state.data, action.payload],
      };
    }
    case UPDATE_BOOK_FAILURE: {
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
