import { CocktailDBAPI } from "./cocktailAPI.js";

export default function wiki() {
  console.log("wiki start");
  //////////////////////////////
  // CONSTANTS
  //////////////////////////////
  const PAGE_SIZE = 16;

  //////////////////////////////
  // VARIABLES
  //////////////////////////////
  let currentPage = 1;
  const cocktailsList = document.querySelector("#cocktails-list");
  const paggination = document.querySelector("#paggination");
  const prevPageButton = document.querySelector(".fa-angle-left");
  const nextPageButton = document.querySelector(".fa-angle-right");
  const search = document.querySelector("#search");
  const dimmer = document.querySelector("#dimmer");
  const popup = document.querySelector("#cocktail-popup");
  const closePopupButton = document.querySelector("#close-popup");

  let cocktails = [];
  let searchedCocktails = [];

  //////////////////////////////
  // HANDLERS
  //////////////////////////////
  (() => {
    console.log("Page is loading...");

    CocktailDBAPI.getAllCocktails().then((result) => {
      cocktails = result;
      searchedCocktails = cocktails;

      // Show paggination
      paggination.classList.remove("paggination_hidden");

      showContent();
    });
  })();

  paggination.addEventListener("click", (event) => {
    if (
      event.target.closest(".paggination__pages") &&
      event.target.tagName === "LI"
    ) {
      const pageNumber = parseInt(event.target.innerText);
      if (isNaN(pageNumber)) {
        return;
      }

      currentPage = pageNumber;
      showContent();
    }
  });

  prevPageButton.addEventListener("click", (event) => {
    if (currentPage === 1) {
      return;
    }

    currentPage--;
    showContent();
  });

  nextPageButton.addEventListener("click", (event) => {
    if (currentPage === Math.ceil(searchedCocktails.length / PAGE_SIZE)) {
      return;
    }

    currentPage++;
    showContent();
  });

  search.addEventListener("input", (event) => {
    searchedCocktails = cocktails.filter((cocktail) => {
      const name = cocktail.name.toLowerCase();
      const value = event.target.value.toLowerCase();
      return name.startsWith(value);
    });

    currentPage = 1;
    showContent();
  });

  cocktailsList.addEventListener("click", (event) => {
    let card = event.target.closest(".card");
    if (card) {
      showCocktailPopup(card.dataset.cocktailId);
    }
  });

  dimmer.addEventListener("click", (event) => {
    closeCocktailPopup();
  });

  closePopupButton.addEventListener("click", (event) => {
    closeCocktailPopup();
  });
  //////////////////////////////
  // HELPERS
  //////////////////////////////
  function showContent() {
    showPaggination();

    // Show page with cocktails
    showPage(currentPage);
  }

  function showPage(number) {
    cocktailsList.innerHTML = "";
    const cocktailsToShow = searchedCocktails.slice(
      PAGE_SIZE * (number - 1),
      PAGE_SIZE * (number - 1) + PAGE_SIZE
    );
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

  function showPaggination() {
    const pagginationPagesItem = document.querySelector(".paggination__pages");
    pagginationPagesItem.innerHTML = "";
    const pagesAmount = Math.ceil(searchedCocktails.length / PAGE_SIZE);
    if (pagesAmount <= 7) {
      for (let i = 1; i <= pagesAmount; i++) {
        pagginationPagesItem.innerHTML += `<li class=${
          i === currentPage ? "paggination__current-page" : ""
        }>${i}</li>`;
      }
    } else if (currentPage < 4) {
      for (let i = 1; i <= 4; i++) {
        pagginationPagesItem.innerHTML += `<li class=${
          i === currentPage ? "paggination__current-page" : ""
        }>${i}</li>`;
      }
      pagginationPagesItem.innerHTML += `<li class="paggination__hellip">&hellip;</li>`;
      pagginationPagesItem.innerHTML += `<li>${pagesAmount}</li>`;
    } else if (pagesAmount - 3 < currentPage) {
      pagginationPagesItem.innerHTML += `<li>1</li>`;
      pagginationPagesItem.innerHTML += `<li class="paggination__hellip">&hellip;</li>`;
      for (let i = pagesAmount - 4; i <= pagesAmount; i++) {
        pagginationPagesItem.innerHTML += `<li class=${
          i === currentPage ? "paggination__current-page" : ""
        }>${i}</li>`;
      }
    } else {
      pagginationPagesItem.innerHTML += `<li>1</li>`;
      pagginationPagesItem.innerHTML += `<li class="paggination__hellip">&hellip;</li>`;
      pagginationPagesItem.innerHTML += `<li>${currentPage - 1}</li>`;
      pagginationPagesItem.innerHTML += `<li class="paggination__current-page">${currentPage}</li>`;
      pagginationPagesItem.innerHTML += `<li>${currentPage + 1}</li>`;
      pagginationPagesItem.innerHTML += `<li class="paggination__hellip">&hellip;</li>`;
      pagginationPagesItem.innerHTML += `<li>${pagesAmount}</li>`;
    }
  }

  function showCocktailPopup(id) {
    popup.classList.add("popup_active");
    dimmer.classList.add("dimmer_active");
    document.body.classList.add("scroll-blocked");
  }

  function closeCocktailPopup() {
    dimmer.classList.remove("dimmer_active");
    popup.classList.remove("popup_active");
    document.body.classList.remove("scroll-blocked");
  }
}
