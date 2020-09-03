import { CocktailDBAPI } from "./cocktailAPI.js";
//////////////////////////////
// CONSTANTS
//////////////////////////////
const SLOTS_FOR_INGREDIENTS = 12;

//////////////////////////////
// VARIABLES
//////////////////////////////
const burgerBtn = document.querySelector(".header__burger");
const getRandomCocktailBtn = document.querySelector(".cocktail-quiz__start");
const cocktailQuizItem = document.querySelector(".cocktail-quiz");

const Quiz = {
  cocktail: null,
  selectedIngredients: [],
  isQuizReady: function () {
    return this.cocktail.ingredients.length === this.selectedIngredients.length;
  },

  reset: function () {
    this.cocktail = null;
    this.selectedIngredients = [];
  },
};

//////////////////////////////
// EVENTS
//////////////////////////////
getRandomCocktailBtn.addEventListener("click", (e) => {
  generateCocktailQuiz();
});

burgerBtn.addEventListener("click", (e) => {
  document.querySelector(".header__menu").classList.toggle("active");
  document.querySelector(".header__burger").classList.toggle("active");
});

cocktailQuizItem.addEventListener("click", (e) => {
  const ingredientCardItem = e.target.closest(".ingredient-card");
  if (ingredientCardItem && !Quiz.isQuizReady()) {
    selectIngredient(ingredientCardItem);

    const ingredientsCountItem = document.querySelector(".cocktail-quiz__ingredients-count");
    if (ingredientsCountItem) {
      ingredientsCountItem.classList.remove("shake");
      ingredientsCountItem.classList.add("shake");
    }
  }

  const nextTaskButton = e.target.closest(".cocktail-quiz__next");
  if (nextTaskButton) {
    generateCocktailQuiz();
  }
});

cocktailQuizItem.addEventListener("animationend", (e) => {
  if (e.target.classList.contains("shake")) {
    e.target.classList.remove("shake");
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

  const ingredient = ingredientCardItem.querySelector(".ingredient-name")
    .innerText;
  updateSelectedIngredients(ingredient);

  if (Quiz.isQuizReady()) {
    const ingredientCardItems = document.querySelectorAll(
      ".ingredient-card_selected"
    );
    ingredientCardItems.forEach((card) => {
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
  if (cocktailQuizItem) {
    cocktailQuizItem.innerHTML = "";
  }

  Quiz.reset();
}

function showQuiz() {
  cocktailQuizItem.innerHTML = `
    <div class="cocktail-quiz__body">
      <div class="cocktail-quiz__task"></div>
      <div class="cocktail-quiz__ingredients"></div>
    </div>`;
  showQuizTask();
  showCocktailIngredients();
}

function showQuizTask() {
  const quizTaskItem = document.querySelector(".cocktail-quiz__task");
  quizTaskItem.innerHTML = `
    <h2 class="cocktail-quiz__title">${Quiz.cocktail.name}</h2>
    <div class="cocktail-quiz__cocktail-image">
      <img src="${Quiz.cocktail.imgURL}" alt="" />
    </div> 
    <div class="cocktail-quiz__controls">
      <div class="cocktail-quiz__next button">NEXT</div>
      <div class="cocktail-quiz__restart button"><i class="fas fa-redo"></i></div>
      <div class="cocktail-quiz__ingredients-count button">
        <span class="cocktail-quiz__ingredients-selected-count">0</span>/<span class="cocktail-quiz__ingredients-total-count">${Quiz.cocktail.ingredients.length}</span>
      </div>
    </div>  
  `;
}

async function showCocktailIngredients() {
  let ingredients = [...Quiz.cocktail.ingredients];
  await addRandomIngredients(ingredients);
  ingredients = shuffle(ingredients);

  const cocktailIngredientsItem = document.createElement("ul");
  cocktailIngredientsItem.classList.add("ingredients-list");
  cocktailIngredientsItem.classList.add("row");
  for (const ingredient of ingredients) {
    cocktailIngredientsItem.innerHTML += `
    <li class="col-6 col-md-3">
      <div class="ingredient-card">
        <div class="ingredient-img">
          <img src="${CocktailDBAPI.getIngredientImg(ingredient)}" alt="" />
        </div>
        <p class="ingredient-name">${ingredient}</p>
      </div>
    </li>`;
  }
  document
    .querySelector(".cocktail-quiz__ingredients")
    .append(cocktailIngredientsItem);
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
    Quiz.selectedIngredients = Quiz.selectedIngredients.filter(
      (value) => value !== ingredient
    );
  } else {
    Quiz.selectedIngredients.push(ingredient);
  }

  document.querySelector(
    ".cocktail-quiz__ingredients-selected-count"
  ).innerText = Quiz.selectedIngredients.length;
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
