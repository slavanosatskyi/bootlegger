import React from "react";

import "../../../style.scss";

const IngredientCard = ({ title, imgUrl }) => {
  return (
    <li className="col-6 col-md-3">
      <div className="card">
        <div className="card__image">
          <img src={imgUrl}></img>
        </div>
        <div className="card__name">{title}</div>
      </div>
    </li>
  );
};

export default IngredientCard;
