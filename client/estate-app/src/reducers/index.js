import { combineReducers } from "redux";
import { getBooks, addBook, removeBook, updateBook } from "./book/booksReducer";
import { getPosts, addPost, updatePost, deletePost } from "./post/postsReducer";

const rootReducer = combineReducers({
  getBooks,
  addBook,
  removeBook,
  updateBook,
  getPosts,
  addPost,
  updatePost,
  deletePost,
});

export default rootReducer;
