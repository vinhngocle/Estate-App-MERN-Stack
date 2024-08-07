import { takeEvery } from "redux-saga/effects";
import {
  GET_POSTS,
  ADD_POST,
  UPDATE_POST,
  DELETE_POST,
} from "../../actions/post/types";
import {
  getPostsSaga,
  addPostSaga,
  updatePostSaga,
  deletePostSaga,
} from "./postSaga";

function* watchBookSaga() {
  yield takeEvery(GET_POSTS, getPostsSaga);
  yield takeEvery(ADD_POST, addPostSaga);
  yield takeEvery(UPDATE_POST, updatePostSaga);
  yield takeEvery(DELETE_POST, deletePostSaga);
}

export default watchBookSaga;
