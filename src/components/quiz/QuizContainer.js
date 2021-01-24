import React, { Fragment } from "react";

import SplashScreen from "./SplashScreen/SplashScreen";
import Quiz from "./Quiz/Quiz";

const QuizContainer = (props) => {
  const isQuizRunning = true;
  const activeComponent = isQuizRunning ? (
    <Quiz ingredientsCatalog={props.ingredientsCatalog} />
  ) : (
    <SplashScreen />
  );
  return <main>{activeComponent}</main>;
};

export default QuizContainer;
