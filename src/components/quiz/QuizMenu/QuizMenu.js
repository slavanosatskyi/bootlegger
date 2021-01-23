import React from "react";

import ControlsPanel from "../ControlsPanel/ControlsPanel";
import NextCocktailButton from "../NextCocktailButton/NextCocktailButton";
import SelectedIngredientsCounter from "../SelectedIngredientsCounter/SelectedIngredientsCounter";
import TaskDescription from "../TaskDescription/TaskDescription";

const QuizMenu = ({ cocktail }) => {
  const selectedIngredients = cocktail.ingredients.filter(
    (ingredient) => ingredient.selected
  );
  
  return (
    <div>
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
