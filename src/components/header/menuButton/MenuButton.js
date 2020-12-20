import React from 'react';

import "./MenuButton.scss";

const MenuButton = (props) => {
    return (
        <div className="header__menu-button" onClick={props.onClick}>
          <span></span>
        </div>
    );
}

export default MenuButton;