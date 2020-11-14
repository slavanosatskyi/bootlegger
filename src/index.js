import React from 'react';
import ReactDOM from 'react-dom';

import App from "./components/app/App";

import global from "./components/header/global.js";
import quiz from "./components/quiz/quiz.js";
import wiki from "./components/wiki/wiki.js";

import "../images/cocktail-panel.jpg";

document.addEventListener("DOMContentLoaded", (e) => {
  const path = window.location.pathname;
  const page = path.split("/").pop();
 
  if (page === "index.html" || path === "/") {
    ReactDOM.render(<App />, document.querySelector("#root"));
    global();
    quiz();
  } else if (page === "wiki.html") {
    global();
    wiki();
  }
});

