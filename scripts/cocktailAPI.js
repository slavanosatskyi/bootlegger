export class CocktailDBAPI {
  async getRandomCocktail() {
    let response = await fetch(
      "https://www.thecocktaildb.com/api/json/v1/1/random.php"
    );

    if (response.ok) {
      const cocktailData = await response.json();
      return new Cocktail(cocktailData.drinks[0].strDrink, getIngredients(cocktailData.drinks[0]))
    }
  }
}

export class Cocktail {
  constructor(name, ingredients = null) {
    this.name = name;
    this.ingredients = ingredients;
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