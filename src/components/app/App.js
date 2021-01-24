import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import { getAllIngredients } from "../../service/cocktailAPI";

import QuizContainer from "../quiz/QuizContainer";
import Wiki from "../wiki/Wiki";
import Header from "../header/Header";

import "./App.scss";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ingredientsCatalog: [],
    };
  }

  componentDidMount() {
    getAllIngredients().then((ingredientsCatalog) => {
      this.setState({ ingredientsCatalog });
    });
  }

  render() {
    const { ingredientsCatalog } = this.state;
    return (
      <div className="app">
        <Router basename="/">
          <Header />
          <Switch>
            <Route exact path={["/", "/quiz"]}>
              {ingredientsCatalog.length != 0 && (
                <QuizContainer ingredientsCatalog={ingredientsCatalog} />
              )}
            </Route>
            <Route path="/wiki">
              <Wiki />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}
