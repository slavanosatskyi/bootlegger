import React from "react";
import { Link } from "react-router-dom";

import "./Header.scss";
import MenuButton from "./menuButton/MenuButton";

export default class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <header className="header">
        <div className="header__logo">
          <div className="header__icon">
            <i className="fas fa-cocktail"></i>
          </div>
          <h1 className="header__text">Bootlegger</h1>
        </div>
        <MenuButton />
        <nav className="header__menu">
          <ul className="header__links-list">
            <li>
              <Link to="/quiz/" className="header__link">
                QUIZ
              </Link>
            </li>
            <li>
              <Link to="/wiki/" className="header__link">
                WIKI
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

const header = () => {
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
};
