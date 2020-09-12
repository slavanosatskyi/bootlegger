export class Cocktail {
  constructor(name, ingredients = null, imgURL = null) {
    this.name = name;
    this.ingredients = ingredients;
    this.imgURL = imgURL + "/preview";
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
      return new Cocktail(
        cocktailData.drinks[0].strDrink,
        await getIngredientsForCocktail(cocktailData.drinks[0]),
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
