export const getRandomCocktail = async () => ({
  id: "1",
  title: "Blood Marry",
  imgUrl: "image/preview",
  recipe: "instructions",
  ingredients: [
    { id: "1", title: "Tomato", imgUrl: "imageUrl", measure: "1/2 oz" },
    { id: "3", title: "Vodka", imgUrl: "imageUrl", measure: "1/2 oz" },
  ],
});

export const getAllCocktails = async () => {};

export async function getAllIngredients() {
  return [
    buildIngridient("1", "Tomato"),
    buildIngridient("2", "Whisky"),
    buildIngridient("3", "Vodka"),
    buildIngridient("4", "Gin"),
    buildIngridient("5", "Beer"),
    buildIngridient("6", "Milk"),
    buildIngridient("7", "Honey"),
    buildIngridient("8", "Lime"),
    buildIngridient("9", "Lemon"),
    buildIngridient("10", "Chocolate"),
    buildIngridient("11", "Sugar"),
    buildIngridient("12", "Salt"),
  ];
}

const buildIngridient = (id, title) => ({
  id,
  title,
  imgUrl: "imageUrl",
  recipe: "instructions",
  measure: "1/2 oz",
});

///////////////////////
// DEPRICATED
//////////////////////

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
}

export class CocktailDBAPI {
  static async getAllCocktails() {
    return [];
  }
}
