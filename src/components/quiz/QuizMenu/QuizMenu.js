import React from "react";

import ControlsPanel from "../ControlsPanel/ControlsPanel";
import NextCocktailButton from "../NextCocktailButton/NextCocktailButton";
import SelectedIngredientsCounter from "../SelectedIngredientsCounter/SelectedIngredientsCounter";
import TaskDescription from "../TaskDescription/TaskDescription";

import "./QuizMenu.scss";

const QuizMenu = ({ cocktail }) => {
  const selectedIngredients = cocktail.ingredients.filter(
    (ingredient) => ingredient.selected
  );
  
  return (
    <div className="quiz-menu">
      <TaskDescription
        cocktailTitle={cocktail.title}
        cocktailImageUrl={cocktail.imgUrl}
      />
      <ControlsPanel>
        <SelectedIngredientsCounter
          selectedIngredientsCount={selectedIngredients.length}
          ingredientsCount={cocktail.ingredients.length}
        />
        <NextCocktailButton />
      </ControlsPanel>
    </div>
  );
};

export default QuizMenu;
