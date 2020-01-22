import React from "React";
import ReactDom from "react-dom";
import { rootStore, sagaMiddleware } from "./store";
import { Provider } from "react-redux";
import { MovieComponent, MoreComponent } from "./movies";
import { LoadingComponent } from "./loading";
import { rootSaga } from "./reducer";
const store = rootStore.getState();
class App extends React.Component {
  render() {
    return (
      <>
        <Provider store={rootStore}>
          {" "}
          {/* 이렇게 해야지 전파가 됨 */}
          {store.movie.map((item, idx) => {
            return <MovieComponent idx={idx} {...item} />;
          })}
          <MoreComponent />
          <LoadingComponent />
        </Provider>
      </>
    );
  }
}
const rendering = function() {
  ReactDom.render(<App />, document.getElementById("app"));
};
rendering();
rootStore.subscribe(rendering);

// saga 실행
sagaMiddleware.run(rootSaga);
