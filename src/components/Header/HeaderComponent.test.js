import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { HeaderComponent } from "./HeaderComponent";
import { MemoryRouter } from "react-router-dom";

const mockedUseNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUseNavigate,
}));

describe("Header Component", () => {
  let component;

  beforeEach(() => {
    component = render(
      <MemoryRouter>
        <HeaderComponent />
      </MemoryRouter>
    );
  });

  test("should render 'Home' and 'Account'", () => {
    expect(component.getByText(/home/i)).toBeInTheDocument();
    expect(component.getByText(/account/i)).toBeInTheDocument();
  });

  test("should navigate to '/' when Home icon button is clicked", () => {
    fireEvent.click(component.getByRole("button", { name: "home-icon" }));

    expect(mockedUseNavigate).toHaveBeenCalledWith("/");
  });

  test("should navigate to '/login' when Account icon button is clicked", () => {
    fireEvent.click(component.getByRole("button", { name: "account-icon" }));

    expect(mockedUseNavigate).toHaveBeenCalledWith("/login");
  });
});
