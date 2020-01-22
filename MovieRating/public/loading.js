import React from "React";
import { connect } from "react-redux";
import { ACTION_CREATOR, ADDCLICK } from "./actions";

class Loading extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log("리렌더?");
    return (
      <>
        <div
          className={
            "loading " + (this.props.loading.load == "off" ? "active" : "")
          }
        >
          {this.props.loading.load}
        </div>
      </>
    );
  }
}
const mapStateToProps = state => ({ loading: state.loading }); // state라고 표현하는데 store의 저장값을 props로 가져오도록 하는것

export const LoadingComponent = connect(mapStateToProps)(Loading); // Movie를 connect가 래핑한 다음에 내보내서 사용할수 있도록 해주는것
