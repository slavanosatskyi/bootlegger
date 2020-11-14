import React from "react";

export default function App() {
  return (
    <div className="container">
      <header className="header row">
        <div className="header__logo">
          <div className="header__icon">
            <i className="fas fa-cocktail"></i>
          </div>
          <h1 className="header__text">Bootlegger</h1>
        </div>
        <div className="header__burger" id="burger">
          <span></span>
        </div>
        <nav className="header__menu">
          <ul className="header__links-list">
            <li>
              <a href="./index.html" className="header__link">
                QUIZ
              </a>
            </li>
            <li>
              <a href="./wiki.html" className="header__link">
                WIKI
              </a>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <div className="cocktail-quiz" id="cocktail-quiz">
          <div className="panel cocktail-quiz__panel">
            <div className="panel__logo">
              <img src="./images/cocktail-panel.jpg" alt="" />
            </div>
            <div className="panel__call-to-action">
              <p className="panel__text">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Tempora iusto recusandae porro accusantium, vel temporibus
                excepturi quae facilis omnis vero molestias doloribus id
                obcaecati, deleniti, veniam quibusdam cupiditate explicabo
                voluptatem.
              </p>
              <button className="panel__button" id="startQuiz">
                START
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
