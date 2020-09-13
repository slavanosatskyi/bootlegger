export class Cocktail {
  constructor({idDrink, strDrink, ingredients, strDrinkThumb}) {
    this.id = idDrink;
    this.name = strDrink;
    this.ingredients = ingredients;
    this.imgURL = strDrinkThumb + "/preview";
  }
}

export class Ingredient {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }

  equals(other) {
    return (
      other instanceof Ingredient &&
      other.id === this.id &&
      other.name === this.name
    );
  }
}

export class CocktailDBAPI {
  static async getRandomCocktail() {
    let response = await fetch(
      "https://www.thecocktaildb.com/api/json/v1/1/random.php"
    );

    if (response.ok) {
      const cocktailData = await response.json();
      cocktailData.drinks[0].ingredients = await getIngredientsForCocktail(cocktailData.drinks[0]);
      return new Cocktail(cocktailData.drinks[0]);
    }
  }

  static async getAllCocktails() {
    // Get all drinks categories
    let response = await fetch(
      "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list"
    );
    if (!response.ok) {
      console.log("Can't get categories list");
      return;
    }

    let categories = await response.json();
    categories = categories.drinks.map(category => category.strCategory);

    // Get all drinks from each category
    let cocktails = [];
    for (let category of categories) {
      cocktails.push(fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`));
    }
    cocktails = await Promise.all(cocktails);
    cocktails = cocktails.map(cocktail => cocktail.json());
    cocktails = await Promise.all(cocktails);
    cocktails = cocktails.map(cocktail => cocktail.drinks);
    cocktails = cocktails.flat();
    cocktails = cocktails.map(cocktail => new Cocktail(cocktail));

    return cocktails;
  }

  static getIngredientImg(ingredient) {
    return `https://www.thecocktaildb.com/images/ingredients/${ingredient}-Medium.png`;
  }

  static async getAllIngredients() {
    let response = await fetch(
      "https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list"
    );

    if (response.ok) {
      let ingredients = await response.json();
      ingredients = ingredients.drinks.map((item) =>
        fetch(
          `https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${item.strIngredient1}`
        )
      );

      return await rawDataToIngredients(ingredients);
    }
  }
}

async function getIngredientsForCocktail(drink) {
  let fieldName = "strIngredient";
  let index = 1;
  let ingredientName = drink[fieldName + index];
  let ingredients = [];

  while (ingredientName) {
    ingredients.push(
      fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${ingredientName}`
      )
    );
    index++;
    ingredientName = drink[fieldName + index];
  }

  return await rawDataToIngredients(ingredients);
}

async function rawDataToIngredients(rawData) {
  let ingredients = rawData;
  ingredients = await Promise.all(ingredients);
  ingredients = ingredients.map((ingredientData) => ingredientData.json());
  ingredients = await Promise.all(ingredients);
  ingredients = ingredients.map((ingredientData) => {
    return new Ingredient(
      ingredientData.ingredients[0].idIngredient,
      ingredientData.ingredients[0].strIngredient
    );
  });

  return ingredients;
}
