import { fork } from "redux-saga/effects";
import watchBookSaga from "./book/watchers";
import watchPostSaga from "./post/watchers";

export default function* startForman() {
  yield fork(watchBookSaga);
  yield fork(watchPostSaga);
}
