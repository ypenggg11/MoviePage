import { render, renderHook, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import PaginationContextProvider from "../../store/PaginationContextProvider";
import MoviesList from "./MoviesList";
import { getApiDefaultPath, getApiKey } from "../../services/api-config";

jest.mock("../../hooks/useFetch");

describe("MoviesList component", () => {
  //   const { result } = renderHook(() =>
  //     useFetch(
  //       `${getApiDefaultPath()}movie/popular?api_key=${getApiKey()}&language=en-US&page=1`
  //     )
  //   );

  //   test("should render 20 movies", async () => {
  //     let movies;
  //     await waitFor(() => {
  //       movies = result.current.data.results.map((movie) => {
  //         return {
  //           id: movie.id,
  //           title: movie.title,
  //           poster_path: movie.poster_path,
  //           release_date: movie.release_date,
  //           popularity: movie.popularity,
  //         };
  //       });
  //     });

  //     render(
  //       <MemoryRouter>
  //         <PaginationContextProvider>
  //           <MoviesList movies={movies} />
  //         </PaginationContextProvider>
  //       </MemoryRouter>
  //     );

  //     expect(screen.getAllByTestId("movie-item")).toHaveLength(20);
  //   });

  test("should render 3 movies", () => {
    let dummyMovies = [
      {
        id: 1,
        title: "Movie 1",
        poster_path: "Poster path 1",
        release_date: "Date 1",
        popularity: 1,
      },
      {
        id: 2,
        title: "Movie 2",
        poster_path: "Poster path 2",
        release_date: "Date 2",
        popularity: 2,
      },
      {
        id: 3,
        title: "Movie 3",
        poster_path: "Poster path 3",
        release_date: "Date 3",
        popularity: 3,
      },
    ];

    render(
      <MemoryRouter>
        <PaginationContextProvider>
          <MoviesList movies={dummyMovies} />
        </PaginationContextProvider>
      </MemoryRouter>
    );

    expect(screen.getAllByTestId("movie-item")).toHaveLength(3);
  });
});
