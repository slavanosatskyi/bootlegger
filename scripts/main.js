import { CocktailDBAPI } from "./cocktailAPI.js";
import { Cocktail } from "./cocktailAPI.js";

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
        cocktailQuizItem.innerHTML = ""
    }
}

function showCocktailName(name) {
  const cocktailNameItem = document.createElement("h2");
  cocktailNameItem.innerText = name;
  document.querySelector("#cocktail-quiz").append(cocktailNameItem);
}

function showCocktailIngedients(ingredients) {
  const cocktailIngredientsItem = document.createElement("ul");
  for (const ingredient of ingredients) {
    console.log(ingredient);
    cocktailIngredientsItem.innerHTML += `<li>${ingredient}</li>`;
  }
  document.querySelector("#cocktail-quiz").append(cocktailIngredientsItem);
}
