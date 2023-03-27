import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import { SearchBarComponent } from "./SearchBarComponent";
import { getSearchMovieUrl } from "../../services/api-requests";

const mockedOnChange = jest.fn();

describe("SearchBarComponent", () => {
  test("should render the text box", () => {
    render(
      <MemoryRouter>
        <SearchBarComponent onChange={jest.fn()} />
      </MemoryRouter>
    );

    const searchTextField = screen.getByRole("textbox");

    expect(searchTextField).toBeInTheDocument();
  });

  test("should onChange be called with the textfield value as query param in the request url", async () => {
    render(
      <MemoryRouter>
        <SearchBarComponent onChange={mockedOnChange} />
      </MemoryRouter>
    );

    const searchTextField = screen.getByRole("textbox");

    fireEvent.change(searchTextField, { target: { value: "Avengers" } });

    expect(searchTextField).toHaveValue("Avengers");

    await waitFor(() =>
      expect(mockedOnChange).toHaveBeenCalledWith(getSearchMovieUrl("Avengers"))
    );
  });
});
