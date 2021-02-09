import React from "react";

import "./ShowDescriptionButton.scss";

const ShowDescriptionButton = ({onClick}) => {
  return (
    <button className="button  task-description-button" onClick={onClick}>
      <i className="fas fa-cocktail" aria-hidden="true"></i>
    </button>
  );
};

export default ShowDescriptionButton;
