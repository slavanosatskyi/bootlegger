import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import QuizContainer from "../quiz/QuizContainer";
import Wiki from "../wiki/Wiki";
import Header from "../header/Header";

import "./App.scss";

const ingredientsCatalog = [
  {
    id: "305",
    title: "Light Rum",
    imgUrl:
      "https://www.thecocktaildb.com/images/ingredients/Light Rum-Medium.png",
  },
  {
    id: "31",
    title: "Applejack",
    imgUrl:
      "https://www.thecocktaildb.com/images/ingredients/Applejack-Medium.png",
  },
  {
    id: "2",
    title: "Gin",
    imgUrl: "https://www.thecocktaildb.com/images/ingredients/Gin-Medium.png",
  },
  {
    id: "179",
    title: "Dark Rum",
    imgUrl:
      "https://www.thecocktaildb.com/images/ingredients/Dark Rum-Medium.png",
  },
  {
    id: "482",
    title: "Sweet Vermouth",
    imgUrl:
      "https://www.thecocktaildb.com/images/ingredients/Sweet Vermouth-Medium.png",
  },
  {
    id: "473",
    title: "Strawberry Schnapps",
    imgUrl:
      "https://www.thecocktaildb.com/images/ingredients/Strawberry Schnapps-Medium.png",
  },
  {
    id: "5",
    title: "Scotch",
    imgUrl:
      "https://www.thecocktaildb.com/images/ingredients/Scotch-Medium.png",
  },
  {
    id: "32",
    title: "Apricot Brandy",
    imgUrl:
      "https://www.thecocktaildb.com/images/ingredients/Apricot Brandy-Medium.png",
  },
  {
    id: "498",
    title: "Triple Sec",
    imgUrl:
      "https://www.thecocktaildb.com/images/ingredients/Triple Sec-Medium.png",
  },
  {
    id: "458",
    title: "Southern Comfort",
    imgUrl:
      "https://www.thecocktaildb.com/images/ingredients/Southern Comfort-Medium.png",
  },
  {
    id: "350",
    title: "Orange Bitters",
    imgUrl:
      "https://www.thecocktaildb.com/images/ingredients/Orange Bitters-Medium.png",
  },
  {
    id: "74",
    title: "Brandy",
    imgUrl:
      "https://www.thecocktaildb.com/images/ingredients/Brandy-Medium.png",
  },
  {
    id: "296",
    title: "Lemon vodka",
    imgUrl:
      "https://www.thecocktaildb.com/images/ingredients/Lemon vodka-Medium.png",
  },
  {
    id: "66",
    title: "Blended Whiskey",
    imgUrl:
      "https://www.thecocktaildb.com/images/ingredients/Blended Whiskey-Medium.png",
  },
  {
    id: "189",
    title: "Dry Vermouth",
    imgUrl:
      "https://www.thecocktaildb.com/images/ingredients/Dry Vermouth-Medium.png",
  },
  {
    id: "18",
    title: "Amaretto",
    imgUrl:
      "https://www.thecocktaildb.com/images/ingredients/Amaretto-Medium.png",
  },
  {
    id: "486",
    title: "Tea",
    imgUrl: "https://www.thecocktaildb.com/images/ingredients/Tea-Medium.png",
  },
  {
    id: "97",
    title: "Champagne",
    imgUrl:
      "https://www.thecocktaildb.com/images/ingredients/Champagne-Medium.png",
  },
  {
    id: "138",
    title: "Coffee Liqueur",
    imgUrl:
      "https://www.thecocktaildb.com/images/ingredients/Coffee Liqueur-Medium.png",
  },
  {
    id: "71",
    title: "Bourbon",
    imgUrl:
      "https://www.thecocktaildb.com/images/ingredients/Bourbon-Medium.png",
  },
  {
    id: "4",
    title: "Tequila",
    imgUrl:
      "https://www.thecocktaildb.com/images/ingredients/Tequila-Medium.png",
  },
  {
    id: "1",
    title: "Vodka",
    imgUrl: "https://www.thecocktaildb.com/images/ingredients/Vodka-Medium.png",
  },
  {
    id: "37",
    title: "Añejo Rum",
    imgUrl:
      "https://www.thecocktaildb.com/images/ingredients/Añejo Rum-Medium.png",
  },
  {
    id: "56",
    title: "Bitters",
    imgUrl:
      "https://www.thecocktaildb.com/images/ingredients/Bitters-Medium.png",
  },
  {
    id: "476",
    title: "Sugar",
    imgUrl: "https://www.thecocktaildb.com/images/ingredients/Sugar-Medium.png",
  },
  {
    id: "282",
    title: "Kahlua",
    imgUrl:
      "https://www.thecocktaildb.com/images/ingredients/Kahlua-Medium.png",
  },
  {
    id: "181",
    title: "Demerara Sugar",
    imgUrl:
      "https://www.thecocktaildb.com/images/ingredients/Demerara Sugar-Medium.png",
  },
  {
    id: "191",
    title: "Dubonnet Rouge",
    imgUrl:
      "https://www.thecocktaildb.com/images/ingredients/Dubonnet Rouge-Medium.png",
  },
  {
    id: "603",
    title: "Watermelon",
    imgUrl:
      "https://www.thecocktaildb.com/images/ingredients/Watermelon-Medium.png",
  },
  {
    id: "308",
    title: "Lime Juice",
    imgUrl:
      "https://www.thecocktaildb.com/images/ingredients/Lime Juice-Medium.png",
  },
  {
    id: "273",
    title: "Irish Whiskey",
    imgUrl:
      "https://www.thecocktaildb.com/images/ingredients/Irish Whiskey-Medium.png",
  },
  {
    id: "26",
    title: "Apple Brandy",
    imgUrl:
      "https://www.thecocktaildb.com/images/ingredients/Apple Brandy-Medium.png",
  },
  {
    id: "89",
    title: "Carbonated Water",
    imgUrl:
      "https://www.thecocktaildb.com/images/ingredients/Carbonated Water-Medium.png",
  },
  {
    id: "100",
    title: "Cherry Brandy",
    imgUrl:
      "https://www.thecocktaildb.com/images/ingredients/Cherry Brandy-Medium.png",
  },
  {
    id: "164",
    title: "Creme De Cacao",
    imgUrl:
      "https://www.thecocktaildb.com/images/ingredients/Creme De Cacao-Medium.png",
  },
  {
    id: "250",
    title: "Grenadine",
    imgUrl:
      "https://www.thecocktaildb.com/images/ingredients/Grenadine-Medium.png",
  },
  {
    id: "406",
    title: "Port",
    imgUrl: "https://www.thecocktaildb.com/images/ingredients/Port-Medium.png",
  },
  {
    id: "137",
    title: "Coffee Brandy",
    imgUrl:
      "https://www.thecocktaildb.com/images/ingredients/Coffee Brandy-Medium.png",
  },
  {
    id: "425",
    title: "Red Wine",
    imgUrl:
      "https://www.thecocktaildb.com/images/ingredients/Red Wine-Medium.png",
  },
  {
    id: "3",
    title: "Rum",
    imgUrl: "https://www.thecocktaildb.com/images/ingredients/Rum-Medium.png",
  },
  {
    id: "242",
    title: "Grapefruit Juice",
    imgUrl:
      "https://www.thecocktaildb.com/images/ingredients/Grapefruit Juice-Medium.png",
  },
  {
    id: "427",
    title: "Ricard",
    imgUrl:
      "https://www.thecocktaildb.com/images/ingredients/Ricard-Medium.png",
  },
  {
    id: "449",
    title: "Sherry",
    imgUrl:
      "https://www.thecocktaildb.com/images/ingredients/Sherry-Medium.png",
  },
  {
    id: "141",
    title: "Cognac",
    imgUrl:
      "https://www.thecocktaildb.com/images/ingredients/Cognac-Medium.png",
  },
  {
    id: "453",
    title: "Sloe Gin",
    imgUrl:
      "https://www.thecocktaildb.com/images/ingredients/Sloe Gin-Medium.png",
  },
  {
    id: "28",
    title: "Apple Juice",
    imgUrl:
      "https://www.thecocktaildb.com/images/ingredients/Apple Juice-Medium.png",
  },
  {
    id: "393",
    title: "Pineapple Juice",
    imgUrl:
      "https://www.thecocktaildb.com/images/ingredients/Pineapple Juice-Medium.png",
  },
  {
    id: "293",
    title: "Lemon Juice",
    imgUrl:
      "https://www.thecocktaildb.com/images/ingredients/Lemon Juice-Medium.png",
  },
  {
    id: "475",
    title: "Sugar Syrup",
    imgUrl:
      "https://www.thecocktaildb.com/images/ingredients/Sugar Syrup-Medium.png",
  },
  {
    id: "333",
    title: "Milk",
    imgUrl: "https://www.thecocktaildb.com/images/ingredients/Milk-Medium.png",
  },
  {
    id: "470",
    title: "Strawberries",
    imgUrl:
      "https://www.thecocktaildb.com/images/ingredients/Strawberries-Medium.png",
  },
  {
    id: "115",
    title: "Chocolate Syrup",
    imgUrl:
      "https://www.thecocktaildb.com/images/ingredients/Chocolate Syrup-Medium.png",
  },
  {
    id: "533",
    title: "Yoghurt",
    imgUrl:
      "https://www.thecocktaildb.com/images/ingredients/Yoghurt-Medium.png",
  },
  {
    id: "319",
    title: "Mango",
    imgUrl: "https://www.thecocktaildb.com/images/ingredients/Mango-Medium.png",
  },
  {
    id: "230",
    title: "Ginger",
    imgUrl:
      "https://www.thecocktaildb.com/images/ingredients/Ginger-Medium.png",
  },
  {
    id: "312",
    title: "Lime",
    imgUrl: "https://www.thecocktaildb.com/images/ingredients/Lime-Medium.png",
  },
  {
    id: "86",
    title: "Cantaloupe",
    imgUrl:
      "https://www.thecocktaildb.com/images/ingredients/Cantaloupe-Medium.png",
  },
  {
    id: "54",
    title: "Berries",
    imgUrl:
      "https://www.thecocktaildb.com/images/ingredients/Berries-Medium.png",
  },
  {
    id: "243",
    title: "Grapes",
    imgUrl:
      "https://www.thecocktaildb.com/images/ingredients/Grapes-Medium.png",
  },
  {
    id: "286",
    title: "Kiwi",
    imgUrl: "https://www.thecocktaildb.com/images/ingredients/Kiwi-Medium.png",
  },
  {
    id: "492",
    title: "Tomato Juice",
    imgUrl:
      "https://www.thecocktaildb.com/images/ingredients/Tomato Juice-Medium.png",
  },
  {
    id: "131",
    title: "Cocoa Powder",
    imgUrl:
      "https://www.thecocktaildb.com/images/ingredients/Cocoa Powder-Medium.png",
  },
  {
    id: "116",
    title: "Chocolate",
    imgUrl:
      "https://www.thecocktaildb.com/images/ingredients/Chocolate-Medium.png",
  },
  {
    id: "259",
    title: "Heavy cream",
    imgUrl:
      "https://www.thecocktaildb.com/images/ingredients/Heavy cream-Medium.png",
  },
  {
    id: "223",
    title: "Galliano",
    imgUrl:
      "https://www.thecocktaildb.com/images/ingredients/Galliano-Medium.png",
  },
  {
    id: "380",
    title: "Peach Vodka",
    imgUrl:
      "https://www.thecocktaildb.com/images/ingredients/Peach Vodka-Medium.png",
  },
  {
    id: "363",
    title: "Ouzo",
    imgUrl: "https://www.thecocktaildb.com/images/ingredients/Ouzo-Medium.png",
  },
  {
    id: "139",
    title: "Coffee",
    imgUrl:
      "https://www.thecocktaildb.com/images/ingredients/Coffee-Medium.png",
  },
  {
    id: "464",
    title: "Spiced Rum",
    imgUrl:
      "https://www.thecocktaildb.com/images/ingredients/Spiced Rum-Medium.png",
  },
  {
    id: "513",
    title: "Water",
    imgUrl: "https://www.thecocktaildb.com/images/ingredients/Water-Medium.png",
  },
  {
    id: "200",
    title: "Espresso",
    imgUrl:
      "https://www.thecocktaildb.com/images/ingredients/Espresso-Medium.png",
  },
  {
    id: "19",
    title: "Angelica Root",
    imgUrl:
      "https://www.thecocktaildb.com/images/ingredients/Angelica Root-Medium.png",
  },
  {
    id: "359",
    title: "Orange",
    imgUrl:
      "https://www.thecocktaildb.com/images/ingredients/Orange-Medium.png",
  },
  {
    id: "154",
    title: "Cranberries",
    imgUrl:
      "https://www.thecocktaildb.com/images/ingredients/Cranberries-Medium.png",
  },
  {
    id: "280",
    title: "Johnnie Walker",
    imgUrl:
      "https://www.thecocktaildb.com/images/ingredients/Johnnie Walker-Medium.png",
  },
  {
    id: "27",
    title: "Apple Cider",
    imgUrl:
      "https://www.thecocktaildb.com/images/ingredients/Apple Cider-Medium.png",
  },
  {
    id: "201",
    title: "Everclear",
    imgUrl:
      "https://www.thecocktaildb.com/images/ingredients/Everclear-Medium.png",
  },
  {
    id: "155",
    title: "Cranberry Juice",
    imgUrl:
      "https://www.thecocktaildb.com/images/ingredients/Cranberry Juice-Medium.png",
  },
  {
    id: "193",
    title: "Egg Yolk",
    imgUrl:
      "https://www.thecocktaildb.com/images/ingredients/Egg Yolk-Medium.png",
  },
  {
    id: "194",
    title: "Egg",
    imgUrl: "https://www.thecocktaildb.com/images/ingredients/Egg-Medium.png",
  },
  {
    id: "240",
    title: "Grape juice",
    imgUrl:
      "https://www.thecocktaildb.com/images/ingredients/Grape juice-Medium.png",
  },
  {
    id: "378",
    title: "Peach Nectar",
    imgUrl:
      "https://www.thecocktaildb.com/images/ingredients/Peach Nectar-Medium.png",
  },
  {
    id: "299",
    title: "lemon",
    imgUrl: "https://www.thecocktaildb.com/images/ingredients/lemon-Medium.png",
  },
  {
    id: "207",
    title: "Firewater",
    imgUrl:
      "https://www.thecocktaildb.com/images/ingredients/Firewater-Medium.png",
  },
  {
    id: "300",
    title: "Lemonade",
    imgUrl:
      "https://www.thecocktaildb.com/images/ingredients/Lemonade-Medium.png",
  },
  {
    id: "289",
    title: "Lager",
    imgUrl: "https://www.thecocktaildb.com/images/ingredients/Lager-Medium.png",
  },
  {
    id: "600",
    title: "Whiskey",
    imgUrl:
      "https://www.thecocktaildb.com/images/ingredients/Whiskey-Medium.png",
  },
  {
    id: "574",
    title: "Absolut citron",
    imgUrl:
      "https://www.thecocktaildb.com/images/ingredients/Absolut citron-Medium.png",
  },
  {
    id: "400",
    title: "Pisco",
    imgUrl: "https://www.thecocktaildb.com/images/ingredients/Pisco-Medium.png",
  },
  {
    id: "272",
    title: "Irish cream",
    imgUrl:
      "https://www.thecocktaildb.com/images/ingredients/Irish cream-Medium.png",
  },
  {
    id: "13",
    title: "Ale",
    imgUrl: "https://www.thecocktaildb.com/images/ingredients/Ale-Medium.png",
  },
  {
    id: "113",
    title: "Chocolate Liqueur",
    imgUrl:
      "https://www.thecocktaildb.com/images/ingredients/Chocolate Liqueur-Medium.png",
  },
  {
    id: "331",
    title: "Midori Melon Liqueur",
    imgUrl:
      "https://www.thecocktaildb.com/images/ingredients/Midori Melon Liqueur-Medium.png",
  },
  {
    id: "440",
    title: "Sambuca",
    imgUrl:
      "https://www.thecocktaildb.com/images/ingredients/Sambuca-Medium.png",
  },
  {
    id: "120",
    title: "Cider",
    imgUrl: "https://www.thecocktaildb.com/images/ingredients/Cider-Medium.png",
  },
  {
    id: "466",
    title: "Sprite",
    imgUrl:
      "https://www.thecocktaildb.com/images/ingredients/Sprite-Medium.png",
  },
  {
    id: "572",
    title: "7-up",
    imgUrl: "https://www.thecocktaildb.com/images/ingredients/7-up-Medium.png",
  },
  {
    id: "61",
    title: "Blackberry Brandy",
    imgUrl:
      "https://www.thecocktaildb.com/images/ingredients/Blackberry Brandy-Medium.png",
  },
  {
    id: "388",
    title: "Peppermint Schnapps",
    imgUrl:
      "https://www.thecocktaildb.com/images/ingredients/Peppermint Schnapps-Medium.png",
  },
  {
    id: "165",
    title: "Creme De Cassis",
    imgUrl:
      "https://www.thecocktaildb.com/images/ingredients/Creme De Cassis-Medium.png",
  },
];

const App = () => {
  return (
    <div className="app">
      <Router basename="/">
        <Header />
        <Switch>
          <Route exact path={["/", "/quiz"]}>
            <QuizContainer ingredientsCatalog={ingredientsCatalog}/>
          </Route>
          <Route path="/wiki">
            <Wiki />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
