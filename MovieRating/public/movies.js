import React from "React";
import { connect } from "react-redux";
import PropTypes, { string, number } from "prop-types";
import { ACTION_CREATOR, ADDCLICK } from "./actions";

class Movie extends React.Component {
  constructor(props) {
    super(props);
  }
  clickStar(index) {
    this.props.changeStar(
      movie => {
        movie[this.props.idx].star = index;
        return movie;
      },
      this.props.idx,
      index
    );
  }
  printStar(active, index) {
    return active ? (
      <span
        className="star on"
        onClick={(() => {
          return this.clickStar(index);
        }).bind(this)}
      >
        ★
      </span>
    ) : (
      <span
        className="star off"
        onClick={(() => {
          return this.clickStar(index);
        }).bind(this)}
      >
        ☆
      </span>
    );
  }
  printStarList(star) {
    let list = [];
    return (
      <ul>
        {(() => {
          for (var i = 0; i < 5; i++) {
            list.push(this.printStar(star >= i, i));
          }
          return list.map(item => item);
        })()}
      </ul>
    );
  }
  render() {
    return (
      <>
        <div className="movie">
          <img src={"./image/" + this.props.poster} alt={this.props.name} />
          <br />
          <strong>제목:: {this.props.name}</strong>
          <br />
          <div>{this.printStarList(this.props.star)}</div>
        </div>
      </>
    );
  }
}
Movie.PropTypes = {
  name: string,
  poster: string,
  star: number
};
const mapStateToProps = state => ({ movie: state.movie }); // state라고 표현하는데 store의 저장값을 props로 가져오도록 하는것

const mapDispatchToProps = dispatch => {
  return {
    changeStar: (f, index, star) =>
      dispatch(ACTION_CREATOR.changeStar(f, index, star)), // 액션 생성자 함수는 여기에 연결.
    addMovie: () => dispatch(ADDCLICK.addMovie()) // 액션 생성자 함수는 여기에 연결.
  };
};
export const More = function(props) {
  return (
    <>
      <button
        onClick={() => {
          return props.addMovie();
        }}
      >
        {"영화 추가하기"}
      </button>
    </>
  );
};
export const MoreComponent = connect(mapStateToProps, mapDispatchToProps)(More); // Movie를 connect가 래핑한 다음에 내보내서 사용할수 있도록 해주는것

export const MovieComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(Movie); // Movie를 connect가 래핑한 다음에 내보내서 사용할수 있도록 해주는것
