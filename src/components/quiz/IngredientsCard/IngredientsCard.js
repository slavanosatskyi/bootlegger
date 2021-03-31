import React from "react";

const IngredientCard = ({
  title,
  imgUrl,
  selected,
  isQuizOver,
  isCocktailIngredient,
  onCardClick,
}) => {
  const selectedClass = selected ? "card_selected" : "";
  const grayedOut = isQuizOver && !isCocktailIngredient ? "card_grayedout" : "";
  const correct = isQuizOver && selected && isCocktailIngredient ? "card_correct" : "";
  const wrong = isQuizOver && selected && !isCocktailIngredient ? "card_wrong" : "";

  return (
    <li className="col-6 col-md-3" onClick={onCardClick}>
      <div className={`card ${selectedClass} ${grayedOut} ${correct} ${wrong}`}>
        <div className="card__image">
          <img src={imgUrl}></img>
        </div>
        <div className="card__name">{title}</div>
      </div>
    </li>
  );
};

export default IngredientCard;
