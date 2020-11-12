export default function global() {
//////////////////////////////
// VARIABLES
//////////////////////////////
const burgerBtn = document.querySelector("#burger");

//////////////////////////////
// EVENTS
//////////////////////////////
burgerBtn.addEventListener("click", (e) => {
  toggleBurgerMenu();
});

//////////////////////////////
// HANDLERS
//////////////////////////////
function toggleBurgerMenu() {
  document.querySelector(".header__menu").classList.toggle("active");
  document.querySelector(".header__burger").classList.toggle("active");
}
}

