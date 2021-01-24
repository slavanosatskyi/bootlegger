import React, { Fragment } from "react";

import SplashScreen from "./SplashScreen/SplashScreen";
import Quiz from "./Quiz/Quiz";

import "./QuizContainer.scss";

const QuizContainer = (props) => {
  const isQuizRunning = false;
  const activeComponent = isQuizRunning ? (
    <Quiz ingredientsCatalog={props.ingredientsCatalog} />
  ) : (
    <SplashScreen className="cocktail-quiz__panel"/>
  );
  return <main>{activeComponent}</main>;
};

export default QuizContainer;
