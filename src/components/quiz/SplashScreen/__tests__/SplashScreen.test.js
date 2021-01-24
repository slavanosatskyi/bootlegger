import React from "react";
import {render, fireEvent} from "@testing-library/react";

import SplashScreen from "../SplashScreen.js";

test("when start button is clicked handler is called", () => {
    const handler = jest.fn();
    const {getByText} = render(<SplashScreen onClick={handler}/>);

    fireEvent.click(getByText("START"));
    expect(handler).toHaveBeenCalledTimes(1);
}) 