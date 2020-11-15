import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";

import Quiz from "../quiz/Quiz";
import Wiki from "../wiki/Wiki";
import Header from "../header/Header";

const App = () => {
    return (
      <HashRouter basename="/">
        <div className="container">
          <Header />
          <Switch>
            <Route exact path={["/", "/quiz"]}>
              <Quiz />
            </Route>
            <Route path="/wiki">
              <Wiki />
            </Route>
          </Switch>
        </div>
      </HashRouter>
    );
}

export default App;
