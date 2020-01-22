import { TYPES } from "./actions";
import { initialState } from "./store";
import { delay, takeLatest, put } from "redux-saga/effects";
import axios from "axios";

// **** 리듀서 함수 정의
const addArrayItem = function(state, item) {
  item.forEach(function(i) {
    state.push(i);
  });
  return state;
};
export const REDUCER_MOVIE = function reducer(state = initialState, action) {
  switch (action.type) {
    case TYPES.CHANGE:
      return action.f(state, action.idx, action.star); // 일반적으로 새로 덮어쓰는데 redux는 같은 참조를 유지해야함
    case TYPES.ADDCLICK:
      return state;
    case TYPES.ADDMOVIE:
      let data = addArrayItem(state, action.payload);
      return data; // 일반적으로 새로 덮어쓰는데 redux는 같은 참조를 유지해야함
    default:
      // 지원하지 않는 액션의 경우 상태 유지
      return state;
  }
};

export const REDUCER_LOADING = function reducer(
  state = { load: "on" },
  action
) {
  switch (action.type) {
    case TYPES.LOADSTART:
      return { ...state, load: action.payload }; // 일반적으로 새로 덮어쓰는데 redux는 같은 참조를 유지해야함
    case TYPES.LOADEND:
      return { ...state, load: action.payload }; // 일반적으로 새로 덮어쓰는데 redux는 같은 참조를 유지해야함
    default:
      // 지원하지 않는 액션의 경우 상태 유지
      return state;
  }
};
const getMovieData = () => {
  let res = "";
  return axios
    .get("/nextMovie")
    .then(response => {
      return (res = response.data);
    }) // SUCCESS
    .catch(response => {
      return (res = response);
    }); // ERROR
};
const memoAction = function*() {
  yield put({ type: TYPES.LOADSTART, payload: "off" });
  const movie = yield getMovieData();
  yield put({ type: TYPES.ADDMOVIE, payload: movie });
  yield delay(1000);
  yield put({ type: TYPES.LOADEND, payload: "on" });
};
export const rootSaga = function*() {
  /* 
    saga 에는 여러가지 메서드들이 있다.
    take, takeLatest -> 특정 액션 감시후 비동기 로직 동작하도록 할 수 있음.
    put -> dispath 여기서 바로 액션 실행?
    delay -> 실행 지연.
    fort -> 새로운 하위 태스크 생성, 즉 연속해서 담에 뭐할지를 붙여주는것. (블럭X)
    call -> 새로운 하위 태스크 생성, 즉 연속해서 담에 뭐할지를 붙여주는것. (블럭o)
    state -> 스토어에서 가져올때 사용.  (블럭o)
   */
  // 실행을 리스너가 받기까지 멈춰놓고 next를 호출하는 방식이라 저렇게 제너레이트를 걸어놓아야 하는 듯 함
  yield takeLatest(TYPES.ADDCLICK, memoAction);
};
