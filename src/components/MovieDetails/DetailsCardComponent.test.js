import { render, screen } from "@testing-library/react";
import AuthContext from "../../store/auth-context";

import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";

import { DetailsCardComponent } from "./DetailsCardComponent";

const dummyMovie = {
  id: 1,
  title: "1",
  poster_path: "1",
  backdrop_path: "1",
  homepage: "1",
  genres: ["1", "1"],
  vote_average: "1",
  overview: "1",
};

describe("DetailsCard Component", () => {
  test("should render the rating if the user is logged in", () => {
    render(
      <AuthContext.Provider value={{ isLoggedIn: true }}>
        <MemoryRouter>
          <DetailsCardComponent movie={dummyMovie} />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(screen.getByTitle("rating-container")).toBeInTheDocument();
  });
});
