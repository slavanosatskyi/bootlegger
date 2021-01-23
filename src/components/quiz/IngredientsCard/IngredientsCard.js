import React from "react";

const IngredientCard = ({title, imgUrl}) => {
    return (
        <div>
            <div>
                <img src={imgUrl}></img>
            </div>
            <div>{title}</div>
        </div>
    )
}

export default IngredientCard;