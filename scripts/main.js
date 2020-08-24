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
  const cocktail = await CocktailDBAPI.getRandomCocktail();
  cleanQuiz();
  showQuiz(cocktail);
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
      <figure>
        <img src="${cocktail.imgURL}" alt="" />
        <figcaption>${cocktail.name}<figcaption>
      </figure>
      <div>0/${cocktail.ingredients.length}</div>
    </div>
  `;
}

async function showCocktailIngredients(ingredients) {
  await addRandomIngredients(ingredients);
  ingredients = shuffle(ingredients);

  const cocktailIngredientsItem = document.createElement("ul");
  for (const ingredient of ingredients) {
    cocktailIngredientsItem.innerHTML += `
    <li>
      <figure>
        <img src="${CocktailDBAPI.getIngredientImg(ingredient)}" alt="" />
        <figcaption>${ingredient}</figcaption>
      </figure>
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
