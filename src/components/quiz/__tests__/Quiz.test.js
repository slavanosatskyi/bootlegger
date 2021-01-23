//TODO: Create test for unselecting item
//TODO: Create test when quiz is over and user presses on a card one more time
//TODO: Ensure that all cocktails ingredients apperas only once

import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";

import Quiz from "../QuizContainer.js";
import * as api from "../../../service/cocktailAPI";

jest.mock("../../../service/cocktailAPI.js");

test("should show intro screen when user opens Quiz menu", async () => {
  const { getByText, getByTestId } = render(<Quiz />);

  let startButton;
  await waitFor(() => {
    startButton = getByText("START");
  });

  expect(startButton).toBeInTheDocument();
  expect(getByTestId("intro_image")).toBeInTheDocument();
  expect(getByTestId("intro_text")).toBeInTheDocument();
});

test("should show quiz screen with cocktail and ingredients when a user presses button START", async () => {
  const { getByText, queryByText, queryByTestId } = render(<Quiz />);

  let startButton;
  await waitFor(() => {
    startButton = getByText("START");
  });
  fireEvent.click(startButton);

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

  let startButton;
  await waitFor(() => {
    startButton = getByText("START");
  });

  fireEvent.click(startButton);
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
  api.getRandomCocktail = jest
    .fn()
    .mockResolvedValueOnce({
      id: "1",
      title: "Blood Marry",
      imgUrl: "image/preview",
      recipe: "instructions",
      ingredients: [
        { id: "1", title: "Tomato", imgUrl: "imageUrl", measure: "1/2 oz" },
        { id: "3", title: "Vodka", imgUrl: "imageUrl", measure: "1/2 oz" },
      ],
    })
    .mockResolvedValueOnce({
      id: "2",
      title: "Whisky Cola",
      imgUrl: "image/preview",
      recipe: "instructions",
      ingredients: [
        { id: "123", title: "Cola", imgUrl: "imageUrl", measure: "1/2 oz" },
        { id: "2", title: "Whisky", imgUrl: "imageUrl", measure: "1/2 oz" },
      ],
    });

  let startButton;
  await waitFor(() => {
    startButton = getByText("START");
  });
  fireEvent.click(startButton);
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
