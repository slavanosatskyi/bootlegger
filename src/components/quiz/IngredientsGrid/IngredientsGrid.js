import React from "react";

import IngredientCard from "../IngredientsCard/IngredientsCard";

import "./IngredientsGrid.scss";

const IngredientsGrid = ({ ingredients }) => {
  const cards = ingredients.map(({ id, title, imgUrl }) => {
    return <IngredientCard key={id} title={title} imgUrl={imgUrl} />;
  });

  return (
    <div className="ingredients-grid">
      <ul className="row cards-list">{cards}</ul>
    </div>
  );
};

export default IngredientsGrid;
