import React from "react";

const NextCocktailButton = ({ className, onClick }) => {
  return (
    <button className={className} onClick={onClick}>
      NEXT
    </button>
  );
};

export default NextCocktailButton;
