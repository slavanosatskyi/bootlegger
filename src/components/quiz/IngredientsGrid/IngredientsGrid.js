import React from "react";

import IngredientCard from "../IngredientsCard/IngredientsCard";

const IngredientsGrid = ({ ingredients }) => {
    const cards = ingredients.map(({id, title, imgUrl}) => {
        return <IngredientCard key={id} title={title} imgUrl={imgUrl}/>
    });

    return <div>{cards}</div>
};

export default IngredientsGrid;
