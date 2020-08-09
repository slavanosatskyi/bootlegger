export class CocktailAPI {
  async getRandomCocktail() {
    let response = await fetch(
      "https://www.thecocktaildb.com/api/json/v1/1/random.php",
      {
        method: "GET"
      }
    );

    let json = null;
    if (response.ok) {
        json = await response.json();
    }

    return json;
  }
}
