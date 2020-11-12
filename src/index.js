import global from "./header/global.js";
import quiz from "./components/quiz/quiz.js";
import wiki from "./components/wiki/wiki.js";

window.onload = () => {
  var path = window.location.pathname;
  var page = path.split("/").pop();
  global();
  if (page === "index.html") {
    quiz();
  } else {
    wiki();
  }
};
