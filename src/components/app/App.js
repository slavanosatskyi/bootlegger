import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Quiz from "../quiz/Quiz";
import Wiki from "../wiki/Wiki";
import Header from "../header/Header";

const App = () => {
    return (
      <Router>
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
      </Router>
    );
}

export default App;
