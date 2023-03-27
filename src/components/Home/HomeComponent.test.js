import { screen, render } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import "@testing-library/jest-dom";
import { ErrorBoundary } from "react-error-boundary";
import { MemoryRouter } from "react-router-dom";

import { ErrorFallbackComponent } from "../Error/ErrorFallbackComponent";
import { MoviesListContainer } from "../../containers";

describe("Home Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should render error modal if his childs has error", async () => {
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        status: 500,
        json: () => Promise.resolve(undefined),
      })
    );

    await act(async () => {
      render(
        <MemoryRouter>
          <ErrorBoundary fallback={<ErrorFallbackComponent />}>
            <MoviesListContainer fetchUrl={""}/>
          </ErrorBoundary>
        </MemoryRouter>
      );
    });

    expect(screen.getByText(/An error has occurred/i)).toBeInTheDocument();
  });
});
