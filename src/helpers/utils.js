
export function addRandomIngredients(
  initialIngredients,
  allAvaliableIngredients
) {
  const uniqueIngredients = allAvaliableIngredients.filter(
    (ingredient) =>
      !initialIngredients.find(({id}) =>
        id === ingredient.id
      )
  );
  
  const SLOTS_FOR_INGREDIENTS = 12;
  while (initialIngredients.length != SLOTS_FOR_INGREDIENTS) {
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
