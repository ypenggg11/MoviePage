import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PaginationContextProvider from "../../store/PaginationContextProvider";

import { MoviesListComponent } from "./MoviesListComponent";

describe("MoviesList Component", () => {
  test("should render 3 movies", () => {
    const dummyMovies = [{ id: 1 }, { id: 2 }, { id: 3 }];

    render(
      <MemoryRouter>
        <PaginationContextProvider>
          <MoviesListComponent movies={dummyMovies} />
        </PaginationContextProvider>
      </MemoryRouter>
    );

    expect(screen.getAllByRole("listitem")).toHaveLength(3);
  });
});
