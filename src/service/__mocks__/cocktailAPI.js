export class Cocktail {
  constructor({ idDrink, strDrink, ingredients, strDrinkThumb }) {
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
    return other instanceof Ingredient && other.id === this.id;
  }
}

export class CocktailDBAPI {
  static async getRandomCocktail() {
    return new Cocktail({
      idDrink: "1",
      strDrink: "Blood Marry",
      ingredients: [new Ingredient("1", "Tomato"), new Ingredient("3", "Vodka")],
      strDrinkThumb: "image",
    });
  }

  static async getAllCocktails() {
    return [];
  }

  static getIngredientImg(ingredient) {
    return `https://www.thecocktaildb.com/images/ingredients/${ingredient}-Medium.png`;
  }

  static async getAllIngredients() {
    return [
      new Ingredient("1", "Tomato"),
      new Ingredient("2", "Whisky"),
      new Ingredient("3", "Vodka"),
      new Ingredient("4", "Gin"),
      new Ingredient("5", "Beer"),
      new Ingredient("6", "Milk"),
      new Ingredient("7", "Honey"),
      new Ingredient("8", "Lime"),
      new Ingredient("9", "Lemon"),
      new Ingredient("10", "Chocolate"),
      new Ingredient("11", "Sugar"),
      new Ingredient("12", "Salt"),
    ];
  }
}
