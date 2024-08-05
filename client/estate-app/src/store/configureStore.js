import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootReducer from "../reducers/index";
import rootSaga from "../saga/index";

const sagaMiddleware = createSagaMiddleware();
// mount it on the Store
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

// then run the saga
sagaMiddleware.run(rootSaga);

export default store;
