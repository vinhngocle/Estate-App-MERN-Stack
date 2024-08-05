import { fork } from "redux-saga/effects";
import watchBookSaga from "./book/watchers";

export default function* startForman() {
  yield fork(watchBookSaga);
}
