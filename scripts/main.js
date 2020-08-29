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

const Quiz = {
  cocktail: null,
  selectedIngredients: [],
  isQuizReady: function () {
    console.log(this.cocktail.ingredients.length);
    console.log(this.selectedIngredients.length);
    return this.cocktail.ingredients.length === this.selectedIngredients.length 
  },
  
  reset: function() {
    this.cocktail = null;
    this.selectedIngredients = [];
  }
}

//////////////////////////////
// EVENTS
//////////////////////////////
getRandomCocktailBtn.addEventListener("click", (e) => {
  generateCocktailQuiz();
});

mainContainer.addEventListener("click", (e) => {
  const ingredientCardItem = e.target.closest(".ingredient-card");
  if (ingredientCardItem && !Quiz.isQuizReady()) {
    selectIngredient(ingredientCardItem);
  }
});

//////////////////////////////
// HANDLERS
//////////////////////////////
async function generateCocktailQuiz() {
  resetQuiz();

  Quiz.cocktail = await CocktailDBAPI.getRandomCocktail();
  showQuiz();
}

function selectIngredient(ingredientCardItem) {
  ingredientCardItem.classList.toggle("ingredient-card_selected");

  const ingredient = ingredientCardItem.querySelector(".ingredient-name").innerText;
  updateSelectedIngredients(ingredient);

  if (Quiz.isQuizReady()) {
    const ingredientCardItems = document.querySelectorAll(".ingredient-card_selected");
    ingredientCardItems.forEach(card => {
      const ingredientNameItem = card.querySelector(".ingredient-name");
      if (!ingredientNameItem) {
        return;
      }
      console.log(`Cocktaile ingredients: ${Quiz.cocktail.ingredients}`);

      if (Quiz.cocktail.ingredients.includes(ingredientNameItem.innerText)) {
        card.classList.add("ingredient-card_correct");
      } else {
        card.classList.add("ingredient-card_wrong");
      }
    });
  }
}

//////////////////////////////
// HELPERS
//////////////////////////////
function resetQuiz() {
  const cocktailQuizItem = document.querySelector("#cocktail-quiz");
  if (cocktailQuizItem) {
    cocktailQuizItem.innerHTML = "";
  }

  Quiz.reset();
}

function showQuiz() {
  if (!document.querySelector("#cocktail-quiz")) {
    const cocktailQuizItem = document.createElement("div");
    cocktailQuizItem.id = "cocktail-quiz";
    cocktailQuizItem.classList.add("cocktail-quiz");
    document.querySelector("main").append(cocktailQuizItem);
  }
  showCocktailInfo();
  showCocktailIngredients();
}

function showCocktailInfo() {
  const cocktailQuizItem = document.querySelector("#cocktail-quiz");

  cocktailQuizItem.innerHTML = `
    <div class="cocktail-quiz__header">
      <div class="cocktail-quiz__cocktail-image">
        <img src="${Quiz.cocktail.imgURL}" alt="" />
      </div>
      <h2 class="cocktail-quiz__title">${Quiz.cocktail.name}</h2>
      <div class="cocktail-quiz__ingredients-count"><span class="cocktail-quiz__ingredients-selected-count">0</span>/<span class="cocktail-quiz__ingredients-total-count">${Quiz.cocktail.ingredients.length}</span></div>
    </div>
  `;
}

async function showCocktailIngredients() {
  let ingredients = [...Quiz.cocktail.ingredients];
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

function updateSelectedIngredients(ingredient) {
  if (Quiz.selectedIngredients.includes(ingredient)) {
    Quiz.selectedIngredients = Quiz.selectedIngredients.filter(value => value !== ingredient);
  } else {
    Quiz.selectedIngredients.push(ingredient);
  }

  document.querySelector(".cocktail-quiz__ingredients-selected-count").innerText = Quiz.selectedIngredients.length;
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
