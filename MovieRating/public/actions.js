export const TYPES = {
  CHANGE: "CHANGE",
  ADDCLICK: "ADDCLICK",
  ADDMOVIE: "ADDMOVIE",
  LOADSTART: "LOADSTART",
  LOADEND: "LOADEND"
};

// 액션 생성자 이 녀석을 dispath함
export const ACTION_CREATOR = {
  changeStar: f => {
    return { type: TYPES.CHANGE, f: f }; // 두번째 매개변수는 내가 바꿀 새로은 데이터를 리턴하는 함수
  }
};

export const ADDCLICK = {
  addMovie: f => {
    return { type: TYPES.ADDCLICK }; // 두번째 매개변수는 내가 바꿀 새로은 데이터를 리턴하는 함수
  }
};
