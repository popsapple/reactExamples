const path = require("path");
module.exports = (function() {
  this.option = {
    // 기본 재료가 되는 파일의 위치 지정 - 어디서부터 탐색해갈지
    entry: "./public/index.js",
    // 각 확장자 별로 어떤 걸 이용할지 지정
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: "babel-loader",
          exclude: /node_modules/,
          query: {
            cacheDirectory: true,
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: [["@babel/plugin-transform-runtime"]]
          }
        }
      ]
    },
    output: {
      filename: "main.js",
      path: path.resolve(__dirname, "public"),
      publicPath: path.resolve(__dirname, "public")
    }
  };
  return this.option;
})();
