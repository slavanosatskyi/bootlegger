import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import QuizContainer from "../quiz/QuizContainer";
import Wiki from "../wiki/Wiki";
import Header from "../header/Header";

import "./App.scss";

const App = () => {
  return (
    <div className="app">
      <Router basename="/">
        <Header />
        <Switch>
          <Route exact path={["/", "/quiz"]}>
            <QuizContainer />
          </Route>
          <Route path="/wiki">
            <Wiki />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
