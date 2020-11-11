import global from "./scripts/global.js";
import quiz from "./scripts/quiz.js";
import wiki from "./scripts/wiki.js";

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
