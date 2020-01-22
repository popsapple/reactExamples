import { REDUCER_MOVIE, REDUCER_LOADING } from "./reducer";
import { createStore, applyMiddleware } from "redux";
import { combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";

// 미들웨어 -> 양쪽에서 데이터를 주고 받을 때 중간에서 매개역할 해주며 원래 없는 기능을 불어넣는것.
export const sagaMiddleware = createSagaMiddleware();

export const initialState = [
  {
    name: "첫번째 무비",
    poster: "movie01.jpg",
    star: 0
  },
  {
    name: "두번째 무비",
    poster: "movie02.jpg",
    star: 0
  },
  {
    name: "세번째 무비",
    poster: "movie03.jpg",
    star: 0
  }
];
let rootReducer = combineReducers({
  movie: REDUCER_MOVIE,
  loading: REDUCER_LOADING
});
export const rootStore = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware) // 스토어에 미들웨어 등록
);
