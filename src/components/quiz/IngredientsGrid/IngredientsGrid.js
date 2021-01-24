import React from "react";

import IngredientCard from "../IngredientsCard/IngredientsCard";

import "./IngredientsGrid.scss";

const IngredientsGrid = ({ ingredients, onCardClick }) => {
  const cards = ingredients.map(({ id, title, imgUrl, selected }) => {
    return (
      <IngredientCard
        key={id}
        title={title}
        imgUrl={imgUrl}
        selected={selected}
        onCardClick={() => onCardClick(id)}
      />
    );
  });

  return (
    <div className="ingredients-grid">
      <ul className="row cards-list">{cards}</ul>
    </div>
  );
};

export default IngredientsGrid;
