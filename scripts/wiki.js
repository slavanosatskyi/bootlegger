import { CocktailDBAPI } from "./cocktailAPI.js";

//////////////////////////////
// CONSTANTS
//////////////////////////////
const PAGE_SIZE = 16;

//////////////////////////////
// VARIABLES
//////////////////////////////
const cocktailsList = document.querySelector("#cocktails-list");
const paggination = document.querySelector(".paggination");

let cocktails = [];

//////////////////////////////
// HANDLERS
//////////////////////////////
document.addEventListener("DOMContentLoaded", (event) => {
  CocktailDBAPI.getAllCocktails().then((result) => {
    cocktails = result;
    
    // Show paggination
    paggination.classList.remove("paggination_hidden");
    paggination.querySelector("#last-page").textContent = Math.ceil(cocktails.length / PAGE_SIZE);

    // Show first page
    showPage(1);
  });
});

function showPage(number) {
  cocktailsList.innerHTML = "";
  const cocktailsToShow = cocktails.splice(PAGE_SIZE * number, PAGE_SIZE);
  for (const cocktail of cocktailsToShow) {
    cocktailsList.innerHTML += `
              <li class="col-6 col-md-3">
                <div class="card" data-cocktail-id=${cocktail.id}>
                  <div class="card__image">
                    <img src="${cocktail.imgURL}" alt=""/>
                  </div>
                  <div class="card__name">${cocktail.name}</div>
                </div>
              </li>`;
  }
}
