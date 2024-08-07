import {
  GOT_POSTS,
  ADDED_POST,
  UPDATED_POST,
  DELETED_POST,
} from "../../actions/post/types";

const initialState = {
  posts: [],
  post: null,
};

export const getPosts = (state = initialState, action) => {
  switch (action.type) {
    case GOT_POSTS: {
      return {
        ...state,
        posts: action.payload,
      };
    }
    default: {
      return { ...state };
    }
  }
};

export const addPost = (state = initialState, action) => {
  switch (action.type) {
    case ADDED_POST: {
      return {
        ...state,
        post: action.payload,
        posts: [...state.posts, action.payload],
      };
    }
    default: {
      return { ...state };
    }
  }
};

export const updatePost = (state = initialState, action) => {
  switch (action.type) {
    case UPDATED_POST: {
      return {
        ...state,
        post: action.payload,
      };
    }
    default: {
      return { ...state };
    }
  }
};

export const deletePost = (state = initialState, action) => {
  switch (action.type) {
    case DELETED_POST: {
      return {
        ...state,
        post: action.payload,
      };
    }
    default: {
      return { ...state };
    }
  }
};
