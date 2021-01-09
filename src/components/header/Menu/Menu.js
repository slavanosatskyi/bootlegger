import React from "react";

import { Link } from "react-router-dom";

import "./Menu.scss";

export default class Menu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isActive: false,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState((prev) => ({
      isActive: !prev.isActive,
    }));
  }

  render() {
    const { isActive } = this.state;
    return (
      <nav>
        <div className={`burger-menu ${isActive ? "active" : ""}`} onClick={this.handleClick}>
          <span></span>
        </div>
        <ul className={`menu ${isActive ? "active" : ""}`}>
          <li>
            <Link to="/quiz/" className="menu__link">
              QUIZ
            </Link>
          </li>
          <li>
            <Link to="/wiki/" className="menu__link">
              WIKI
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}
