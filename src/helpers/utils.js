import { QUIZ_INGREDIENTS_GRID_SIZE } from "./config";

export function addRandomIngredients(
  initialIngredients,
  allAvaliableIngredients
) {
  const uniqueIngredients = allAvaliableIngredients.filter(
    (ingredient) => !initialIngredients.find(({ id }) => id === ingredient.id)
  );

  while (initialIngredients.length != QUIZ_INGREDIENTS_GRID_SIZE) {
    const randomIndex = Math.round(
      Math.random() * (uniqueIngredients.length - 1)
    );
    initialIngredients.push(uniqueIngredients[randomIndex]);
    uniqueIngredients.splice(randomIndex, 1);
  }
}

export function shuffle(array) {
  let indexes = array.map((value, index) => index);
  let shuffledArray = [];
  for (let i = 0; i < array.length; i++) {
    const randomIndex = Math.round(Math.random() * (indexes.length - 1));
    shuffledArray.push(array[indexes[randomIndex]]);
    indexes.splice(randomIndex, 1);
  }

  return shuffledArray;
}
