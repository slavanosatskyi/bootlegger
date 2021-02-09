import React, { Fragment } from "react";

import ControlsPanelDesktop from "../ControlsPanelDesktop/ControlsPanelDesktop";
import ControlsPanelMobile from "../ControlsPanelMobile/ControlsPanelMobile";
import NextCocktailButton from "../NextCocktailButton/NextCocktailButton";
import SelectedIngredientsCounter from "../SelectedIngredientsCounter/SelectedIngredientsCounter";
import ShowDescriptionButton from "../ShowDescriptionButton/ShowDescriptionButton";
import TaskDescription from "../TaskDescription/TaskDescription";

import "./QuizMenu.scss";

export default class QuizMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isMenuCollapsed: false,
    };

    this.handleShowDescriptionButtonClick = this.handleShowDescriptionButtonClick.bind(
      this
    );
  }

  componentDidMount() {
    if (screen.width > 768) {
      return;
    }
    
    setTimeout(() => {
      this.setState({ isMenuCollapsed: true });
    }, 3000);
  }

  componentDidUpdate(prevProps) {
    if (screen.width > 768) {
      return;
    }
    
    if (prevProps.cocktail.id != this.props.cocktail.id) {
      this.setState({ isMenuCollapsed: false });
    }

    if (!this.state.isMenuCollapsed) {
      setTimeout(() => {
        this.setState({ isMenuCollapsed: true });
      }, 3000);
    }
  }

  handleShowDescriptionButtonClick() {
    if (this.state.isMenuCollapsed) {
      this.setState({ isMenuCollapsed: false });
    }
  }

  render() {
    const { cocktail, selectedIngredientsCounts, onNextClick } = this.props;
    const { isMenuCollapsed } = this.state;
    const buttonsGroup = (
      <Fragment>
        <SelectedIngredientsCounter
          className="button controls controls__selected-counter"
          selectedIngredientsCount={selectedIngredientsCounts}
          ingredientsCount={cocktail.ingredients.length}
        />
        <NextCocktailButton className="button controls" onClick={onNextClick} />
      </Fragment>
    );

    return (
      <Fragment>
        <ShowDescriptionButton
          onClick={this.handleShowDescriptionButtonClick}
        />
        <ControlsPanelMobile>{buttonsGroup}</ControlsPanelMobile>
        <div className={`quiz-menu ${isMenuCollapsed ? "collapsed" : ""}`}>
          <TaskDescription
            cocktailTitle={cocktail.title}
            cocktailImageUrl={cocktail.imgUrl}
          />
          <ControlsPanelDesktop>{buttonsGroup}</ControlsPanelDesktop>
        </div>
      </Fragment>
    );
  }
}
