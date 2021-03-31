import React from "react";

import SplashScreen from "./SplashScreen/SplashScreen";
import Quiz from "./Quiz/Quiz";

export default class QuizContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isQuizRunning: false
    }

    this.handleStartButtonClick = this.handleStartButtonClick.bind(this);
  }

  handleStartButtonClick() {
    this.setState({isQuizRunning: true});
  }

  render() {
    const { isQuizRunning } = this.state;
    const activeComponent = isQuizRunning ? (
      <Quiz ingredientsCatalog={this.props.ingredientsCatalog} />
    ) : (
      <SplashScreen onClick={this.handleStartButtonClick}/>
    );
    return <main>{activeComponent}</main>;
  } 
}