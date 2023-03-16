import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import Movies from "./Movies";

describe("Movies component", () => {
  test("should update page index to 2 on click", async () => {
    render(<Movies />, { wrapper: BrowserRouter });
    
    userEvent.click(screen.getByText(">"));

    const expected = screen.getByText("1");

    expect(expected).toBeInTheDocument();
  });
});
