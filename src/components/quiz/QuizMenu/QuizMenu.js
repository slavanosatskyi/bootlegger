import React from "react";

import ControlsPanel from "../ControlsPanel/ControlsPanel";
import NextCocktailButton from "../NextCocktailButton/NextCocktailButton";
import SelectedIngredientsCounter from "../SelectedIngredientsCounter/SelectedIngredientsCounter";
import TaskDescription from "../TaskDescription/TaskDescription";

import "./QuizMenu.scss";

const QuizMenu = ({ cocktail, selectedIngredientsCounts, onNextClick }) => {  
  return (
    <div className="quiz-menu">
      <TaskDescription
        cocktailTitle={cocktail.title}
        cocktailImageUrl={cocktail.imgUrl}
      />
      <ControlsPanel>
        <SelectedIngredientsCounter
          className="button controls controls__selected-counter"
          selectedIngredientsCount={selectedIngredientsCounts}
          ingredientsCount={cocktail.ingredients.length}
        />
        <NextCocktailButton className="button controls" onClick={onNextClick}/>
      </ControlsPanel>
    </div>
  );
};

export default QuizMenu;
