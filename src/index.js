import global from "./components/header/global.js";
import quiz from "./components/quiz/quiz.js";
import wiki from "./components/wiki/wiki.js";

import "../images/cocktail-panel.jpg";

document.addEventListener("DOMContentLoaded", (e) => {
  const path = window.location.pathname;
  const page = path.split("/").pop();
  global();
  if (page === "index.html" || path === "/") {
    quiz();
  } else if (page === "wiki.html") {
    wiki();
  }
});

