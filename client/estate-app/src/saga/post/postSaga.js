import { call, put } from "redux-saga/effects";
import {
  GOT_POSTS,
  ADDED_POST,
  UPDATED_POST,
  DELETED_POST,
} from "../../actions/post/types";
import postService from "../../services/postService";

export function* getPostsSaga() {
  try {
    const response = yield call(postService.getAll);
    yield put({ type: GOT_POSTS, payload: response });
  } catch (error) {
    console.log(error);
  }
}

export function* addPostSaga(action) {
  try {
    const response = yield call(postService.add, action.payload);
    yield put({ type: ADDED_POST, payload: response });
  } catch (error) {
    console.log(error);
  }
}

export function* updatePostSaga(action) {
  try {
    const response = yield call(postService.update, action.payload);
    yield put({ type: UPDATED_POST, payload: response });
  } catch (error) {
    console.log(error);
  }
}

export function* deletePostSaga(action) {
  try {
    const response = yield call(postService.delete, action.payload);
    yield put({ type: DELETED_POST, payload: response });
  } catch (error) {
    console.log(error);
  }
}
