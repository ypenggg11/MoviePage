import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PaginationContextProvider from "../../store/PaginationContextProvider";
import MoviesList from "./MoviesList";

describe("MoviesList component", () => {
  test("should render 3 movies", () => {
    let dummyMovies = [{ id: 1 }, { id: 2 }, { id: 3 }];

    render(
      <MemoryRouter>
        <PaginationContextProvider>
          <MoviesList movies={dummyMovies} />
        </PaginationContextProvider>
      </MemoryRouter>
    );

    expect(screen.getAllByRole("listitem")).toHaveLength(3);
  });
});
