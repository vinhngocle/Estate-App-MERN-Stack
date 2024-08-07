import { GET_POSTS, ADD_POST, UPDATE_POST, DELETE_POST } from "./types";

export const getPosts = () => {
  return {
    type: GET_POSTS,
  };
};

export const addPost = (data) => {
  return {
    type: ADD_POST,
    payload: data,
  };
};
export const updatePost = (data) => {
  return {
    type: UPDATE_POST,
    payload: data,
  };
};
export const deletePost = (id) => {
  return {
    type: DELETE_POST,
    payload: id,
  };
};
