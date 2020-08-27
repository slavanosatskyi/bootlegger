import { CocktailDBAPI } from "./cocktailAPI.js";
//////////////////////////////
// CONSTANTS
//////////////////////////////
const SLOTS_FOR_INGREDIENTS = 12;

//////////////////////////////
// VARIABLES
//////////////////////////////
const getRandomCocktailBtn = document.querySelector("#get-random-cocktail");
const mainContainer = document.querySelector("main");

//////////////////////////////
// EVENTS
//////////////////////////////
getRandomCocktailBtn.addEventListener("click", (e) => {
  generateCocktailQuiz();
});

mainContainer.addEventListener("click", (e) => {
  const ingredientCardItem = e.target.closest(".ingredient-card");
  if (ingredientCardItem) {
    selectIngredient(ingredientCardItem);
  }
});

//////////////////////////////
// HANDLERS
//////////////////////////////
async function generateCocktailQuiz() {
  const cocktail = await CocktailDBAPI.getRandomCocktail();
  cleanQuiz();
  showQuiz(cocktail);
}

function selectIngredient(ingredientCardItem) {
  ingredientCardItem.classList.toggle("ingredient-card_selected");
}

//////////////////////////////
// HELPERS
//////////////////////////////
function cleanQuiz() {
  const cocktailQuizItem = document.querySelector("#cocktail-quiz");
  if (cocktailQuizItem) {
    cocktailQuizItem.innerHTML = "";
  }
}

function showQuiz(cocktail) {
  if (!document.querySelector("#cocktail-quiz")) {
    const cocktailQuizItem = document.createElement("div");
    cocktailQuizItem.id = "cocktail-quiz";
    cocktailQuizItem.classList.add("cocktail-quiz");
    document.querySelector("main").append(cocktailQuizItem);
  }
  showCocktailInfo(cocktail);
  showCocktailIngredients(cocktail.ingredients);
}

function showCocktailInfo(cocktail) {
  const cocktailQuizItem = document.querySelector("#cocktail-quiz");

  cocktailQuizItem.innerHTML = `
    <div class="cocktail-quiz__header">
      <div class="cocktail-quiz__cocktail-image">
        <img src="${cocktail.imgURL}" alt="" />
      </div>
      <h2 class="cocktail-quiz__title">${cocktail.name}</h2>
      <div class="cocktail-quiz__ingredients-count">0/${cocktail.ingredients.length}</div>
    </div>
  `;
}

async function showCocktailIngredients(ingredients) {
  await addRandomIngredients(ingredients);
  ingredients = shuffle(ingredients);

  const cocktailIngredientsItem = document.createElement("ul");
  cocktailIngredientsItem.classList.add("ingredients-list");
  for (const ingredient of ingredients) {
    cocktailIngredientsItem.innerHTML += `
    <li class="col-6 col-md-2">
      <div class="ingredient-card">
        <div class="ingredient-img">
          <img src="${CocktailDBAPI.getIngredientImg(ingredient)}" alt="" />
        </div>
        <p class="ingredient-name">${ingredient}</p>
      </div>
    </li>`;
  }
  document.querySelector("#cocktail-quiz").append(cocktailIngredientsItem);
}

async function addRandomIngredients(intialIngredients) {
  let allAvaliableIngredients = await CocktailDBAPI.getAllIngredients();

  while (intialIngredients.length != SLOTS_FOR_INGREDIENTS) {
    const randomIngredient =
      allAvaliableIngredients[
        Math.round(Math.random() * (allAvaliableIngredients.length - 1))
      ];
    if (!intialIngredients.includes(randomIngredient.strIngredient1)) {
      intialIngredients.push(randomIngredient.strIngredient1);
    }
  }
}

function shuffle(array) {
  let indexes = array.map((value, index) => index);
  let shuffledArray = [];
  for (let i = 0; i < array.length; i++) {
    const randomIndex = Math.round(Math.random() * (indexes.length - 1));
    shuffledArray.push(array[indexes[randomIndex]]);
    indexes.splice(randomIndex, 1);
  }

  return shuffledArray;
}
