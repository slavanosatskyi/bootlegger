// Modules
import React from "react";

// Local
import {
  getAllIngredients,
  getRandomCocktail,
} from "../../service/cocktailAPI.js";
import { addRandomIngredients, shuffle } from "../../helpers/utils.js";
import Panel from "./panel/Panel.js";
import TaskDescriptionButton from "./taskDescriptionButton/TaskDescriptionButton.js";

// Assets
import "./QuizContainer.scss";

export default class QuizContainer extends React.Component {
  constructor(props) {
    super(props);

    this.handleStart = this.handleStart.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleCardClick = this.handleCardClick.bind(this);

    this.state = {
      allAvaliableIngredients: [],
      cocktail: null,
      ingredients: [],
      animation: 1
    };
  }

  handleStart() {
    getAllIngredients()
      .then((ingredients) =>
        this.setState({
          allAvaliableIngredients: ingredients,
        })
      )
      .then(() => getRandomCocktail())
      .then((cocktail) => {
        const ingredients = intializeIngirdients(
          cocktail.ingredients,
          this.state.allAvaliableIngredients
        );
        this.setState({
          cocktail,
          ingredients,
        });
      });
  }

  handleNext() {
    getRandomCocktail().then((cocktail) => {
      const ingredients = intializeIngirdients(
        cocktail.ingredients,
        this.state.allAvaliableIngredients
      );
      this.setState({
        cocktail,
        ingredients,
      });
    });
  }

  handleCardClick(ingredientId) {
    const ingredients = [...this.state.ingredients];
    const selectedIngredients = ingredients.filter(
      (ingredient) => ingredient.selected
    );
    if (selectedIngredients.length === this.state.cocktail.ingredients.length) {
      return;
    }
    const selectedIngredient = ingredients.find(
      (ingredient) => ingredient.id === ingredientId
    );
    selectedIngredient.selected = !selectedIngredient.selected;
    this.setState({
      ingredients,
      animation: 1,
    });
  }

  render() {
    const {
      allAvaliableIngredients,
      cocktail,
      ingredients,
      animation,
    } = this.state;
    const isQuizRunning = cocktail && allAvaliableIngredients.length;
    const selectedIngredientsAmount = ingredients.filter(
      (ingredient) => ingredient.selected
    ).length;

    return (
      <main>
        <div className="cocktail-quiz">
          {!isQuizRunning && (
            <Panel
              className="cocktail-quiz__panel"
              onClick={this.handleStart}
            />
          )}
          {isQuizRunning && (
            <TaskDescriptionButton onClick={() => console.log("TBD!!!")}/>
          )}
          {isQuizRunning && (
            <div className="task-description__controls">
              <button
                animation={animation}
                className="task-description__ingredients-count"
                onAnimationEnd={() => {
                  console.log("DONE");
                  this.setState({ animation: 0 });
                }}
              >
                {selectedIngredientsAmount}/{cocktail.ingredients.length}
              </button>
              <button
                className="task-description__next-cocktail"
                onClick={this.handleNext}
              >
                NEXT
              </button>
            </div>
          )}
          {isQuizRunning && (
            <div className="cocktail-quiz__body">
              <div className="cocktail-quiz__ingredients-list">
                <ul className="row cards-list">
                  {ingredients.map((ingredient) => {
                    const selectedClass = ingredient.selected
                      ? "card_selected"
                      : "";
                    let grayedoutClass = "";
                    let wrongClass = "";
                    let correctClass = "";
                    if (
                      selectedIngredientsAmount === cocktail.ingredients.length
                    ) {
                      grayedoutClass = !cocktail.ingredients.find(
                        ({ id }) => id === ingredient.id
                      )
                        ? "card_grayedout"
                        : "";
                      wrongClass =
                        selectedClass && grayedoutClass ? "card_wrong" : "";
                      correctClass =
                        selectedClass && !grayedoutClass ? "card_correct" : "";
                    }
                    const className = `card ${selectedClass} ${grayedoutClass} ${wrongClass} ${correctClass}`;
                    let dataTestId = "";
                    if (wrongClass) {
                      dataTestId = "wrong";
                    }
                    if (correctClass) {
                      dataTestId = "correct";
                    }
                    return (
                      <li
                        key={ingredient.id}
                        className="col-6 col-md-3"
                        onClick={() => this.handleCardClick(ingredient.id)}
                      >
                        <div className={className} data-testid={dataTestId}>
                          <div className="card__image">
                            <img src={ingredient.imgUrl} alt="" />
                          </div>
                          <div className="card__name">{ingredient.title}</div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="task-description cocktail-quiz__task-description">
                <h2 className="task-description__title">{cocktail.title}</h2>
                <div className="task-description__cocktail-image">
                  <img
                    data-testid="cocktail_image"
                    src={cocktail.imgUrl}
                    alt=""
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    );
  }
}

const intializeIngirdients = (cocktailIngridients, allAvaliableIngredients) => {
  let ingredients = [...cocktailIngridients];
  addRandomIngredients(ingredients, allAvaliableIngredients);
  ingredients = shuffle(ingredients);
  ingredients = ingredients.map((ingredient) => ({
    ...ingredient,
    selected: false,
  }));

  return ingredients;
};

