import React from "react";

const SelectedIngredientsCounter = ({
  selectedIngredientsCount: selected,
  ingredientsCount: total,
  className
}) => {
  return (
    <div className={className}>
        {selected}/{total}
    </div>
  );
};

export default SelectedIngredientsCounter;
