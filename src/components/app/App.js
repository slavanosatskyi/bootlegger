import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";

import Quiz from "../quiz/Quiz";
import Wiki from "../wiki/Wiki";
import Header from "../header/Header";

import "./App.scss";

const App = () => {
  return (
    <div className="app">
      <HashRouter basename="/">
        <Header />
        <Switch>
          <Route exact path={["/", "/quiz"]}>
            <Quiz />
          </Route>
          <Route path="/wiki">
            <Wiki />
          </Route>
        </Switch>
      </HashRouter>
    </div>
  );
};

export default App;
