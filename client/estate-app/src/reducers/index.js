import { combineReducers } from "redux";
import { getBooks, addBook } from "./book/booksReducer";
import { getPosts, addPost, updatePost, deletePost } from "./post/postsReducer";

const rootReducer = combineReducers({
  getBooks,
  addBook,
  getPosts,
  addPost,
  updatePost,
  deletePost,
});

export default rootReducer;
