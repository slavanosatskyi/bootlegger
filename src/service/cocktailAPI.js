import axios from "axios";

/////////////////////////////////////
// TODO: make single place for cocktail creation
/////////////////////////////////////

export const getRandomCocktail = async () => {
  try {
    const response = await axios.get(
      "https://www.thecocktaildb.com/api/json/v1/1/random.php"
    );
    const cocktailData = response.data.drinks[0];
    const ingredients = await getCocktailIngredients(cocktailData);
    return {
      id: cocktailData.idDrink,
      title: cocktailData.strDrink,
      imgUrl: cocktailData.strDrinkThumb + "/preview",
      recipe: cocktailData.strInstructions,
      ingredients: ingredients,
    };
  } catch (err) {
    throw Error("Error while getting a random cocktail: " + err);
  }
};

export const getAllCocktails = async () => {
  const getAllCategories = async () => {
    let categories = [];
    try {
      categories = await axios.get(
        "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list"
      );
    } catch {
      throw Error("Error while getting the list of category drinks");
    }

    return categories.data.drinks.map(({ strCategory }) => strCategory);
  }

  const getCocktailsByCategories = async (categories) => {
    let cocktails = [];
    for (let category of categories) {
      cocktails.push(
        axios.get(
          `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`
        )
      );
    }
  
    try {
      cocktails = await Promise.all(cocktails);
    } catch {
      throw Error("Error while getting drinks for all categories");
    }

    return cocktails.map((item) => item.data.drinks).flat();
  }

  const getIngredienstForEachCocktail = async (cocktails) => {
    let ingredients = [];
    for (let i = 0; i < cocktails.length; i++) {
      ingredients.push(getCocktailIngredients(cocktails[i]));
    }
    try {
      return await Promise.all(ingredients);
    } catch(err) {
      throw Error(`Error while getting ingredients for cocktails. ${err.message}`);
    }
  }

  const categories = await getAllCategories();
  const cocktails = await getCocktailsByCategories(categories);
  const ingredients = await getIngredienstForEachCocktail(cocktails);

  return cocktails.map((cocktail, index) => {
    return {
      id: cocktail.idDrink,
      title: cocktail.strDrink,
      imgUrl: cocktail.strDrinkThumb + "/preview",
      recipe: cocktail.strInstructions,
      ingredients: ingredients[index],
    };
  });
};

export async function getAllIngredients() {
  let ingredients = await axios.get(
    "https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list"
  );
  ingredients = ingredients.data.drinks.map(({ strIngredient1 }) =>
    axios.get(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${strIngredient1}`
    )
  );
  ingredients = await Promise.all(ingredients);
  ingredients = ingredients.map(({data}) => data.ingredients[0]);
  
  return ingredients.map(({ idIngredient, strIngredient }) => ({
    id: idIngredient,
    title: strIngredient,
    imgUrl: getIngredientImgUrl(strIngredient),
  }));
}

const getCocktailIngredients = async (cocktail) => {
  const fieldNameIngredient = "strIngredient";
  const fieldNameMeasure = "strMeasure";
  let index = 1;
  let title = cocktail[fieldNameIngredient + index];
  let measure = cocktail[fieldNameMeasure + index];
  let ingredients = [];
  let ingredientsData = [];

  while (title) {
    ingredientsData.push(
      axios.get(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${title}`
      )
    );
    ingredients.push({
      title,
      imgUrl: getIngredientImgUrl(title),
      measure,
    });
    index++;
    title = cocktail[fieldNameIngredient + index];
    measure = cocktail[fieldNameMeasure + index];
  }

  try {
    ingredientsData = await Promise.all(ingredientsData);
    ingredients = ingredients.map((ingredient, index) => ({
      ...ingredient,
      id: ingredientsData[index].data.ingredients[0].idIngredient,
    }));
  } catch(err) {
    throw Error(`Error while trying to get ingredient. ${err}`);
  }

  return ingredients;
};

const getIngredientImgUrl = (ingredientTitle) => {
  return `https://www.thecocktaildb.com/images/ingredients/${ingredientTitle}-Medium.png`;
};





////////////////////////////////
// DEPRICATED
////////////////////////////////
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
    categories = categories.drinks.map((category) => category.strCategory);

    // Get all drinks from each category
    let cocktails = [];
    for (let category of categories) {
      cocktails.push(
        fetch(
          `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`
        )
      );
    }
    cocktails = await Promise.all(cocktails);
    cocktails = cocktails.map((cocktail) => cocktail.json());
    cocktails = await Promise.all(cocktails);
    cocktails = cocktails.map((cocktail) => cocktail.drinks);
    cocktails = cocktails.flat();
    cocktails = cocktails.map((cocktail) => new Cocktail(cocktail));

    return cocktails;
  }
}

