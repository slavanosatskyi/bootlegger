import { CocktailDBAPI } from "./cocktailAPI.js";
//////////////////////////////
// CONSTANTS
//////////////////////////////
const SLOTS_FOR_INGREDIENTS = 9;

//////////////////////////////
// VARIABLES
//////////////////////////////
const getRandomCocktailBtn = document.querySelector("#get-random-cocktail");

//////////////////////////////
// EVENTS
//////////////////////////////
getRandomCocktailBtn.addEventListener("click", (e) => {
  generateCocktailQuiz();
});

//////////////////////////////
// HANDLERS
//////////////////////////////
async function generateCocktailQuiz() {
  const cocktail = await getRandomCocktail();
  cleanQuiz();
  showQuiz(cocktail);
}

//////////////////////////////
// HELPERS
//////////////////////////////
async function getRandomCocktail() {
  let api = new CocktailDBAPI();
  return await api.getRandomCocktail();
}

function showQuiz(cocktail) {
  const cocktailQuiz = document.createElement("div");
  cocktailQuiz.id = "cocktail-quiz";
  cocktailQuiz.classList.add("cocktail-quiz");
  document.querySelector("main").append(cocktailQuiz);
  showCocktailName(cocktail.name);
  showCocktailIngedients(cocktail.ingredients);
}

function cleanQuiz() {
  const cocktailQuizItem = document.querySelector("#cocktail-quiz");
  if (cocktailQuizItem) {
    cocktailQuizItem.innerHTML = "";
  }
}

function showCocktailName(name) {
  const cocktailNameItem = document.createElement("h2");
  cocktailNameItem.innerText = name;
  document.querySelector("#cocktail-quiz").append(cocktailNameItem);
}

async function showCocktailIngedients(ingredients) {
  const randomIngredients = await getAdditionalRandomIngredients(ingredients);
  ingredients.push(...randomIngredients);
  console.log(ingredients);

  const cocktailIngredientsItem = document.createElement("ul");
  for (const ingredient of ingredients) {
    cocktailIngredientsItem.innerHTML += `<li>${ingredient}</li>`;
  }
  document.querySelector("#cocktail-quiz").append(cocktailIngredientsItem);
}

async function getAdditionalRandomIngredients(intialIngredients) {
  const api = new CocktailDBAPI();
  let allAvaliableIngredients = await api.getAllIngredients();

  let IngredientsCountToBeAdded = SLOTS_FOR_INGREDIENTS - intialIngredients.length;
  const randomIngredients = [];
  while (IngredientsCountToBeAdded != 0) {
    const randomIngredient =
      allAvaliableIngredients[
        Math.round(Math.random() * (allAvaliableIngredients.length - 1))
      ];
    if (!intialIngredients.includes(randomIngredient.strIngredient1)) {
      IngredientsCountToBeAdded -= 1;
      randomIngredients.push(randomIngredient.strIngredient1);
    }
  }
  return randomIngredients;
}
