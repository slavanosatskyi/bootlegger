import React from "react";

import IngredientsGrid from "../IngredientsGrid/IngredientsGrid"
import QuizMenu from "../QuizMenu/QuizMenu";

const Quiz = (props) => {
  const cocktail = {
    id: "14978",
    title: "Rum Punch",
    imgUrl:
      "https://www.thecocktaildb.com/images/media/drink/wyrsxu1441554538.jpg/preview",
    recipe: "Mix all ingredients in a punch bowl and serve.",
    ingredients: [
      {
        title: "Rum",
        imgUrl:
          "https://www.thecocktaildb.com/images/ingredients/Rum-Medium.png",
        measure: "mikey bottle ",
        id: "3",
        selected: true
      },
      {
        title: "Ginger ale",
        imgUrl:
          "https://www.thecocktaildb.com/images/ingredients/Ginger ale-Medium.png",
        measure: "large bottle ",
        id: "228",
      },
      {
        title: "Fruit punch",
        imgUrl:
          "https://www.thecocktaildb.com/images/ingredients/Fruit punch-Medium.png",
        measure: "355 ml frozen ",
        id: "221",
      },
      {
        title: "Orange juice",
        imgUrl:
          "https://www.thecocktaildb.com/images/ingredients/Orange juice-Medium.png",
        measure: "355 ml frozen ",
        id: "352",
      },
      {
        title: "Ice",
        imgUrl:
          "https://www.thecocktaildb.com/images/ingredients/Ice-Medium.png",
        measure: "crushed ",
        id: "270",
      },
    ],
  };
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
      imgUrl: "https://www.thecocktaildb.com/images/ingredients/Gin-Medium.png",
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
      <QuizMenu cocktail={cocktail} />
      <IngredientsGrid ingredients={ingredients} />
    </div>
  );
};

export default Quiz;
