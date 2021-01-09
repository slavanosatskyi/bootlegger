import React from "react";
import {
  render,
  fireEvent,
  waitFor,
  getAllByText,
} from "@testing-library/react";

import Quiz from "../Quiz.js";
import {CocktailDBAPI, Cocktail, Ingredient} from "../../../service/cocktailAPI";

jest.mock("../../../service/cocktailAPI.js");

test("should show intro screen when user opens Quiz menu", async () => {
  const { getByText, getByTestId } = render(<Quiz />);

  expect(getByText("START")).toBeInTheDocument();
  expect(getByTestId("intro_image")).toBeInTheDocument();
  expect(getByTestId("intro_text")).toBeInTheDocument();
});

test("should show quiz screen with cocktail and ingredients when a user presses button START", async () => {
  const { getByText, queryByText, queryByTestId } = render(<Quiz />);

  fireEvent.click(getByText("START"));
  await waitFor(() => {
    getByText("NEXT");
  });

  expect(queryByText("START")).not.toBeInTheDocument();
  expect(queryByTestId("intro_image")).not.toBeInTheDocument();
  expect(queryByTestId("intro_text")).not.toBeInTheDocument();
  expect(getByText("Blood Marry")).toBeInTheDocument();

  const ingredients = [
    "Tomato",
    "Whisky",
    "Vodka",
    "Gin",
    "Beer",
    "Milk",
    "Honey",
    "Lime",
    "Lemon",
    "Chocolate",
    "Sugar",
    "Salt",
  ];
  for (const ingredient of ingredients) {
    expect(getByText(ingredient)).toBeInTheDocument();
  }
  // expect(getByText("0/2")).toBeInTheDocument(); TODO: add assertion when migration to React is done
});

test("when user selects all ingredinest the quiz is over", async () => {
  const { getByText, getByTestId } = render(<Quiz />);
  fireEvent.click(getByText("START"));
  await waitFor(() => {
    getByText("NEXT");
  });

  fireEvent.click(getByText("Whisky"));
  fireEvent.click(getByText("Vodka"));

  const whiskyCard = getByTestId("wrong");
  const vodkaCard = getByTestId("correct");

  expect(whiskyCard.innerHTML).toContain("Whisky");
  expect(vodkaCard.innerHTML).toContain("Vodka");
});

test("when user presses Next button a new quiz will be started", async () => {
    const { getByText } = render(<Quiz />);
    CocktailDBAPI.getRandomCocktail = jest.fn()
    .mockResolvedValueOnce(new Cocktail({
        idDrink: "1",
        strDrink: "Blood Marry",
        ingredients: [new Ingredient("1", "Tomato"), new Ingredient("3", "Vodka")],
        strDrinkThumb: "image",
      }))
      .mockResolvedValueOnce(new Cocktail({
        idDrink: "1",
        strDrink: "Whisky Cola",
        ingredients: [new Ingredient("123", "Cola"), new Ingredient("2", "Whisky")],
        strDrinkThumb: "image",
      }));

    fireEvent.click(getByText("START"));
    let nextButton;
    await waitFor(() => {
        nextButton = getByText("NEXT");
    });
  
    fireEvent.click(nextButton);
    await waitFor(() => {
        getByText("NEXT");
    });

    expect(getByText("Whisky Cola")).toBeInTheDocument();
    expect(getByText("Whisky")).toBeInTheDocument();
    expect(getByText("Cola")).toBeInTheDocument();
  });