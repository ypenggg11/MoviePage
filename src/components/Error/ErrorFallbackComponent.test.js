import { screen, render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ErrorFallbackComponent } from "./ErrorFallbackComponent";
import { MemoryRouter } from "react-router-dom";
import * as router from 'react-router'

describe("ErrorFallback Component", () => {
  const navigate = jest.fn();

  beforeEach(() => {
    jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);
  });

  test("should render an alert", () => {
    render(
      <MemoryRouter>
        <ErrorFallbackComponent />
      </MemoryRouter>
    );

    expect(screen.getByText(/An error has occurred/i)).toBeInTheDocument();
  });

  test("should reload when 'reload' button is clicked", () => {
    render(
      <MemoryRouter>
        <ErrorFallbackComponent />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button"));

    // navigate(0) = reload in React Router v6
    expect(navigate).toHaveBeenCalledWith(0);
  });
});
