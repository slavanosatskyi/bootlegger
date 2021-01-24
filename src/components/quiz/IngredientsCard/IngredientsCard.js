import React from "react";

import "../../../style.scss";

const IngredientCard = ({ title, imgUrl, selected, onCardClick }) => {
  return (
    <li className="col-6 col-md-3" onClick={onCardClick}>
      <div className={`card ${selected ? "card_selected": ""}`}>
        <div className="card__image">
          <img src={imgUrl}></img>
        </div>
        <div className="card__name">{title}</div>
      </div>
    </li>
  );
};

export default IngredientCard;
