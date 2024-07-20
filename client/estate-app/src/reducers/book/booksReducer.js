import {
  GET_BOOKS_START,
  GET_BOOKS_SUCCESS,
  GET_BOOKS_FAILURE,
} from "../../actions/book/types";

const initialState = {
  data: [],
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
