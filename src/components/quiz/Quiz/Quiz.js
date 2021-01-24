import React from "react";

import { getRandomCocktail } from "../../../service/cocktailAPI";

import IngredientsGrid from "../IngredientsGrid/IngredientsGrid";
import QuizMenu from "../QuizMenu/QuizMenu";

export default class Quiz extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cocktail: null,
    };

    this.handleNextButtonClick = this.handleNextButtonClick.bind(this);
  }

  componentDidMount() {
    getRandomCocktail().then((cocktail) => {
      this.setState({ cocktail });
    });
  }

  handleNextButtonClick() {
    getRandomCocktail().then((cocktail) => {
      this.setState({ cocktail });
    });
  }

  render() {
    const { cocktail } = this.state;
    const ingredients = [
      {
        id: "305",
        title: "Light Rum",
        imgUrl:
          "https://www.thecocktaildb.com/images/ingredients/Light Rum-Medium.png",
      },
      {
        id: "31",
        title: "Applejack",
        imgUrl:
          "https://www.thecocktaildb.com/images/ingredients/Applejack-Medium.png",
      },
      {
        id: "2",
        title: "Gin",
        imgUrl:
          "https://www.thecocktaildb.com/images/ingredients/Gin-Medium.png",
      },
      {
        id: "179",
        title: "Dark Rum",
        imgUrl:
          "https://www.thecocktaildb.com/images/ingredients/Dark Rum-Medium.png",
      },
      {
        id: "482",
        title: "Sweet Vermouth",
        imgUrl:
          "https://www.thecocktaildb.com/images/ingredients/Sweet Vermouth-Medium.png",
      },
      {
        id: "473",
        title: "Strawberry Schnapps",
        imgUrl:
          "https://www.thecocktaildb.com/images/ingredients/Strawberry Schnapps-Medium.png",
      },
      {
        id: "5",
        title: "Scotch",
        imgUrl:
          "https://www.thecocktaildb.com/images/ingredients/Scotch-Medium.png",
      },
      {
        id: "32",
        title: "Apricot Brandy",
        imgUrl:
          "https://www.thecocktaildb.com/images/ingredients/Apricot Brandy-Medium.png",
      },
      {
        id: "498",
        title: "Triple Sec",
        imgUrl:
          "https://www.thecocktaildb.com/images/ingredients/Triple Sec-Medium.png",
      },
      {
        id: "458",
        title: "Southern Comfort",
        imgUrl:
          "https://www.thecocktaildb.com/images/ingredients/Southern Comfort-Medium.png",
      },
      {
        id: "350",
        title: "Orange Bitters",
        imgUrl:
          "https://www.thecocktaildb.com/images/ingredients/Orange Bitters-Medium.png",
      },
      {
        id: "74",
        title: "Brandy",
        imgUrl:
          "https://www.thecocktaildb.com/images/ingredients/Brandy-Medium.png",
      },
    ];
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
