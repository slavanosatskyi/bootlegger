export class CocktailDBAPI {
  static async getRandomCocktail() {
    let response = await fetch(
      "https://www.thecocktaildb.com/api/json/v1/1/random.php"
    );

    if (response.ok) {
      const cocktailData = await response.json();
      return new Cocktail(
        cocktailData.drinks[0].strDrink,
        getIngredients(cocktailData.drinks[0]),
        cocktailData.drinks[0].strDrinkThumb
      );
    }
  }

  static getIngredientImg(ingredient) {
    return `https://www.thecocktaildb.com/images/ingredients/${ingredient}-Medium.png`;
  }

  static async getAllIngredients() {
    let response = await fetch(
      "https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list"
    );

    if (response.ok) {
      const ingredientsListData = await response.json();
      return ingredientsListData.drinks;
    }
  }
}

export class Cocktail {
  constructor(name, ingredients = null, imgURL = null) {
    this.name = name;
    this.ingredients = ingredients;
    this.imgURL = imgURL + "/preview";
  }
}

function getIngredients(drink) {
  let variableName = "strIngredient";
  let index = 1;
  const ingredients = [];
  while (drink[variableName + index]) {
    ingredients[index - 1] = drink[variableName + index];
    index++;
  }

  return ingredients;
}
