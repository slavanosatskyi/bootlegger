import React from "react";

import Menu from "./Menu/Menu.js";

import "./Header.scss";

export default function Header() {
    return (
      <header className="header">
        <div className="header__logo">
          <div className="header__icon">
            <i className="fas fa-cocktail"></i>
          </div>
          <h1 className="header__text">Bootlegger</h1>
        </div>
        <Menu />
      </header>
    );
}

