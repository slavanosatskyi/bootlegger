import { CocktailDBAPI } from "./cocktailAPI.js";
//////////////////////////////
// CONSTANTS
//////////////////////////////
const SLOTS_FOR_INGREDIENTS = 12;

//////////////////////////////
// VARIABLES
//////////////////////////////
const burgerBtn = document.querySelector("#burger");
const startQuizBtn = document.querySelector("#startQuiz");
const cocktailQuizItem = document.querySelector("#cocktail-quiz");
let allAvaliableIngredients = [];

const Quiz = {
  cocktail: null,
  isQuizReady: function () {
    return (
      this.cocktail.ingredients.length ===
      document.querySelectorAll(".ingredient-card_selected").length
    );
  },

  reset: function () {
    this.cocktail = null;
  },
};

//////////////////////////////
// EVENTS
//////////////////////////////
startQuizBtn.addEventListener("click", (e) => {
  CocktailDBAPI.getAllIngredients().then((result) => {
    allAvaliableIngredients = result;
    generateCocktailQuiz();
  });
});

burgerBtn.addEventListener("click", (e) => {
  toggleBurgerMenu();
});

cocktailQuizItem.addEventListener("click", (e) => {
  const ingredientCardItem = e.target.closest(".ingredient-card");
  if (ingredientCardItem && !Quiz.isQuizReady()) {
    selectIngredient(ingredientCardItem);

    const ingredientsCountItem = document.querySelector("#ingredients-count");
    if (ingredientsCountItem) {
      animateElement(ingredientsCountItem);
    }
  }

  const nextTaskButton = e.target.closest("#next-cocktail");
  if (nextTaskButton) {
    generateCocktailQuiz();
  }

  const showTaskDescriptionBtn = document.querySelector(
    "#show-task-description"
  );
  if (
    showTaskDescriptionBtn &&
    e.target.closest("#show-task-description") === showTaskDescriptionBtn
  ) {
    animateElement(document.querySelector(".task-description"));
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

  document.querySelector(
    "#selected-ingredients-count"
  ).innerText = document.querySelectorAll(".ingredient-card_selected").length;

  if (Quiz.isQuizReady()) {
    showQuizAnswer();
  }
}

function toggleBurgerMenu() {
  document.querySelector(".header__menu").classList.toggle("active");
  document.querySelector(".header__burger").classList.toggle("active");
}

function animateElement(elem) {
  let newone = elem.cloneNode(true);
  elem.parentNode.replaceChild(newone, elem);
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
    <button class="task-description-button" id="show-task-description"><i class="fas fa-cocktail"></i></button>
    <div class="task-description__controls">
      <button class="task-description__ingredients-count" id="ingredients-count">
        <span id="selected-ingredients-count">0</span>/<span id="ingredients-total-count">${Quiz.cocktail.ingredients.length}</span>
      </button>
      <button class="task-description__next-cocktail" id="next-cocktail">NEXT</button>
    </div>
    <div class="cocktail-quiz__body">
      <div class="cocktail-quiz__ingredients-list"></div>
      <div class="task-description cocktail-quiz__task-description"></div>
    </div>`;
  showCocktailIngredients();
  showQuizTask();
}

function showQuizTask() {
  const quizTaskItem = document.querySelector(
    ".cocktail-quiz__task-description"
  );
  quizTaskItem.innerHTML = `
    <h2 class="task-description__title">${Quiz.cocktail.name}</h2>
    <div class="task-description__cocktail-image">
      <img src="${Quiz.cocktail.imgURL}" alt="" />
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
      <div class="ingredient-card" data-ingredient-id=${ingredient.id}>
        <div class="ingredient-card__image">
          <img src="${CocktailDBAPI.getIngredientImg(
            ingredient.name
          )}" alt="" />
        </div>
        <div class="ingredient-card__name">${ingredient.name}</div>
      </div>
    </li>`;
  }
  document
    .querySelector(".cocktail-quiz__ingredients-list")
    .append(cocktailIngredientsItem);
}

function showQuizAnswer() {
  const cards = document.querySelectorAll(".ingredient-card");
  cards.forEach((card) => {
    if (
      !Quiz.cocktail.ingredients.find(
        (ingredient) => ingredient.id === card.dataset.ingredientId
      )
    ) {
      card.classList.add("ingredient-card_grayedout");
      if (card.classList.contains("ingredient-card_selected")) {
        card.classList.add("ingredient-card_wrong");
      }
    } else if (card.classList.contains("ingredient-card_selected")) {
      card.classList.add("ingredient-card_correct");
    }
  });
}

async function addRandomIngredients(initialIngredients) {
  const uniqueIngredients = allAvaliableIngredients.filter(
    (ingredient) =>
      !initialIngredients.find((initialIngredient) =>
        initialIngredient.equals(ingredient)
      )
  );

  while (initialIngredients.length != SLOTS_FOR_INGREDIENTS) {
    const randomIndex = Math.round(
      Math.random() * (uniqueIngredients.length - 1)
    );
    initialIngredients.push(uniqueIngredients[randomIndex]);
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
