import React from "react";

import { QUIZ_INGREDIENTS_GRID_SIZE } from "../../../helpers/config";
import { getRandomCocktail } from "../../../service/cocktailAPI";

import IngredientsGrid from "../IngredientsGrid/IngredientsGrid";
import QuizMenu from "../QuizMenu/QuizMenu";

export default class Quiz extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cocktail: null,
      ingredients: null
    };

    this.handleNextButtonClick = this.handleNextButtonClick.bind(this);
  }

  componentDidMount() {
    this.getNewCocktail();
  }

  handleNextButtonClick() {
    this.getNewCocktail();
  }

  getNewCocktail() {
    getRandomCocktail().then((cocktail) => {
      let ingredients = [...cocktail.ingredients];
      mixinRandomIngredients(ingredients, this.props.ingredientsCatalog);
      ingredients = shuffle(ingredients)
      this.setState({ cocktail, ingredients});
    });
  }

  render() {
    const { cocktail, ingredients } = this.state;

    return (
      <div>
        {cocktail && (
          <QuizMenu
            cocktail={cocktail}
            onNextClick={this.handleNextButtonClick}
          />
        )}
        {cocktail && <IngredientsGrid ingredients={ingredients} />}
      </div>
    );
  }
}

function mixinRandomIngredients(
  initialIngredients,
  ingredientsCatalog
) {
  const uniqueIngredients = ingredientsCatalog.filter(
    (ingredient) => !initialIngredients.find(({ id }) => id === ingredient.id)
  );

  while (initialIngredients.length != QUIZ_INGREDIENTS_GRID_SIZE) {
    const randomIndex = Math.round(
      Math.random() * (uniqueIngredients.length - 1)
    );
    initialIngredients.push(uniqueIngredients[randomIndex]);
    uniqueIngredients.splice(randomIndex, 1);
  }
}

function shuffle(array) {
  let indexes = array.map((value, index) => index);
  let shuffledArray = [];
  for (let i = 0; i < array.length; i++) {
    const randomIndex = Math.round(Math.random() * (indexes.length - 1));
    shuffledArray.push(array[indexes[randomIndex]]);
    indexes.splice(randomIndex, 1);
  }

  return shuffledArray;
}
