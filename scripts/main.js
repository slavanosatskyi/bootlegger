import { CocktailDBAPI } from "./cocktailAPI.js";
//////////////////////////////
// CONSTANTS
//////////////////////////////
const SLOTS_FOR_INGREDIENTS = 12;

//////////////////////////////
// VARIABLES
//////////////////////////////
const burgerBtn = document.querySelector(".header__burger");
const cocktailQuizItem = document.querySelector(".cocktail-quiz");
const startQuizBtn = document.querySelector("#startQuiz");

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
startQuizBtn.addEventListener("click", (e) => {
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
    const ingredientsCountItem = document.querySelector(".task-description__ingredients-count");
    if (ingredientsCountItem) {
      ingredientsCountItem.classList.remove("shake");
      ingredientsCountItem.classList.add("shake");
    }
  }

  const nextTaskButton = e.target.closest(".task-description__next-cocktail");
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
    showAnswer();
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
      <div class="task-description cocktail-quiz__task-description"></div>
      <div class="cocktail-quiz__ingredients-list"></div>
    </div>`;
  showQuizTask();
  showCocktailIngredients();
}

function showQuizTask() {
  const quizTaskItem = document.querySelector(".cocktail-quiz__task-description");
  quizTaskItem.innerHTML = `
    <h2 class="task-description__title">${Quiz.cocktail.name}</h2>
    <div class="task-description__cocktail-image">
      <img src="${Quiz.cocktail.imgURL}" alt="" />
    </div> 
    <div class="task-description__controls">
      <button class="task-description__ingredients-count">
        <span class="cocktail-quiz__ingredients-selected-count">0</span>/<span class="cocktail-quiz__ingredients-total-count">${Quiz.cocktail.ingredients.length}</span>
      </button>
      <button class="task-description__next-cocktail">NEXT</button>
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
    .querySelector(".cocktail-quiz__ingredients-list")
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

function showAnswer() {
  const ingredientCards = document.querySelectorAll(".ingredient-card");
  ingredientCards.forEach(ingredientCard => {
    const ingredientName = ingredientCard.querySelector(".ingredient-name").innerText;
    if (!Quiz.cocktail.ingredients.includes(ingredientName)) {
      ingredientCard.classList.add("grayedout");
    }
  });
}
