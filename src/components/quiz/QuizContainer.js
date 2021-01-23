import React, { Fragment } from "react";

import SplashScreen from "./SplashScreen/SplashScreen";
import Quiz from "./Quiz/Quiz";

import "./QuizContainer.scss";

const QuizContainer = (props) => {
  const isQuizRunning = true;
  const activeComponent = isQuizRunning ? (
    <Quiz ingredientsCatalog={props.ingredientsCatalog} />
  ) : (
    <SplashScreen />
  );
  return <Fragment>{activeComponent}</Fragment>;
};

export default QuizContainer;
