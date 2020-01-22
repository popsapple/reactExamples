const express = require("express");
const path = require("path");
const app = express();

const PORT = 8080;

function handleListen() {
  console.log("Listen on 8080 port");
}

function handleHome(req, res) {
  console.log("Home");
}
function nextMovie(req, res) {
  setTimeout(() => {
    res.send(
      JSON.stringify([
        {
          name: "네번째 무비",
          poster: "movie04.jpg",
          star: 0
        },
        {
          name: "다섯번째 무비",
          poster: "movie05.jpg",
          star: 0
        },
        {
          name: "여섯번째 무비",
          poster: "movie06.jpg",
          star: 0
        }
      ])
    );
  }, 3000);
}
app.use(express.static(path.join(__dirname, "public")));
app.get("/", handleHome);
app.get("/nextMovie", nextMovie);

app.listen(PORT, handleListen);
