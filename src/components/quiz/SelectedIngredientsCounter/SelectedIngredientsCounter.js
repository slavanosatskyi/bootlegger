import React from "react";

const SelectedIngredientsCounter = ({
  selectedIngredientsCount: selected,
  ingredientsCount: total,
}) => {
  return (
    <div>
        {selected}/{total}
    </div>
  );
};

export default SelectedIngredientsCounter;
