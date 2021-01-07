import axios from "axios";
import * as api from "../cocktailAPI";

jest.mock("axios");

afterEach(() => {
  jest.resetAllMocks();
});

test("getRandomCocktail returns a cocktail", async () => {
  axios.get
    .mockResolvedValueOnce({
      drinks: [
        {
          idDrink: "1",
          strDrink: "whiskey sour",
          strDrinkThumb: "image",
          strInstructions: "make a cocktail",
          strIngredient1: "Brandy",
          strIngredient2: "Gin",
          strIngredient3: "Sweet Vermouth",
          strMeasure1: "1 oz",
          strMeasure2: "2 oz",
          strMeasure3: "3 oz",
        },
      ],
    })
    .mockResolvedValueOnce({ ingredients: [{ idIngredient: "1" }] })
    .mockResolvedValueOnce({ ingredients: [{ idIngredient: "2" }] })
    .mockResolvedValueOnce({ ingredients: [{ idIngredient: "3" }] });

  const expected = {
    id: "1",
    title: "whiskey sour",
    imgUrl: "image/preview",
    recipe: "make a cocktail",
    ingredients: [
      {
        id: "1",
        title: "Brandy",
        imgUrl:
          "https://www.thecocktaildb.com/images/ingredients/Brandy-Medium.png",
        measure: "1 oz",
      },
      {
        id: "2",
        title: "Gin",
        imgUrl:
          "https://www.thecocktaildb.com/images/ingredients/Gin-Medium.png",
        measure: "2 oz",
      },
      {
        id: "3",
        title: "Sweet Vermouth",
        imgUrl:
          "https://www.thecocktaildb.com/images/ingredients/Sweet Vermouth-Medium.png",
        measure: "3 oz",
      },
    ],
  };
  const cocktail = await api.getRandomCocktail();
  expect(cocktail).toEqual(expected);
});

test("getAllCocktails returns a list of cocktails", async () => {
  axios.get
    .mockResolvedValueOnce({ drinks: [{ strCategory: "alcohol" }] })
    .mockResolvedValueOnce({
      drinks: [
        {
          idDrink: "1",
          strDrink: "whiskey sour",
          strDrinkThumb: "image",
          strInstructions: "make a cocktail",
          strIngredient1: "Brandy",
          strIngredient2: "Gin",
          strIngredient3: "Sweet Vermouth",
          strMeasure1: "1 oz",
          strMeasure2: "2 oz",
          strMeasure3: "3 oz",
        },
        {
          idDrink: "2",
          strDrink: "margarita",
          strDrinkThumb: "image",
          strInstructions: "make a cocktail",
          strIngredient1: "Tomato",
          strIngredient2: "Vodka",
          strMeasure1: "1 oz",
          strMeasure2: "2 oz",
        },
      ],
    })
    .mockResolvedValueOnce({
      ingredients: [{ idIngredient: "1", strIngredient: "Brandy" }],
    })
    .mockResolvedValueOnce({
      ingredients: [{ idIngredient: "2", strIngredient: "Gin" }],
    })
    .mockResolvedValueOnce({
      ingredients: [{ idIngredient: "3", strIngredient: "Sweet Vermouth" }],
    })
    .mockResolvedValueOnce({
      ingredients: [{ idIngredient: "4", strIngredient: "Tomato" }],
    })
    .mockResolvedValueOnce({
      ingredients: [{ idIngredient: "5", strIngredient: "Vodka" }],
    });

  const cocktails = await api.getAllCocktails();
  const expected = [
    {
      id: "1",
      title: "whiskey sour",
      imgUrl: "image/preview",
      recipe: "make a cocktail",
      ingredients: [
        {
          id: "1",
          title: "Brandy",
          imgUrl:
            "https://www.thecocktaildb.com/images/ingredients/Brandy-Medium.png",
          measure: "1 oz",
        },
        {
          id: "2",
          title: "Gin",
          imgUrl:
            "https://www.thecocktaildb.com/images/ingredients/Gin-Medium.png",
          measure: "2 oz",
        },
        {
          id: "3",
          title: "Sweet Vermouth",
          imgUrl:
            "https://www.thecocktaildb.com/images/ingredients/Sweet Vermouth-Medium.png",
          measure: "3 oz",
        },
      ],
    },
    {
      id: "2",
      title: "margarita",
      imgUrl: "image/preview",
      recipe: "make a cocktail",
      ingredients: [
        {
          id: "4",
          title: "Tomato",
          imgUrl:
            "https://www.thecocktaildb.com/images/ingredients/Tomato-Medium.png",
          measure: "1 oz",
        },
        {
          id: "5",
          title: "Vodka",
          imgUrl:
            "https://www.thecocktaildb.com/images/ingredients/Vodka-Medium.png",
          measure: "2 oz",
        },
      ],
    },
  ];

  expect(cocktails).toEqual(expected);
});

test("getAllIngredients returns a list of ingredients", async () => {
  axios.get
    .mockResolvedValueOnce({
      drinks: [
        {
          strIngredient1: "sugar",
        },
        {
          strIngredient1: "salt",
        },
        {
          strIngredient1: "lime",
        },
      ],
    })
    .mockResolvedValueOnce({ idIngredient: "1", strIngredient: "sugar" })
    .mockResolvedValueOnce({ idIngredient: "2", strIngredient: "salt" })
    .mockResolvedValueOnce({ idIngredient: "3", strIngredient: "lime" });

  const ingredients = await api.getAllIngredients();
  const expected = [
    {
      id: "1",
      title: "sugar",
      imgUrl:
        "https://www.thecocktaildb.com/images/ingredients/sugar-Medium.png",
    },
    {
      id: "2",
      title: "salt",
      imgUrl:
        "https://www.thecocktaildb.com/images/ingredients/salt-Medium.png",
    },
    {
      id: "3",
      title: "lime",
      imgUrl:
        "https://www.thecocktaildb.com/images/ingredients/lime-Medium.png",
    },
  ];
  expect(ingredients).toEqual(expected);
});
