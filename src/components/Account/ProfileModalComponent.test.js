import { render, screen } from "@testing-library/react";
import ProfileModalComponent from "./ProfileModalComponent";
import ReactDOM from "react-dom";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";

describe("ProfileModal Component", () => {
  beforeAll(() => {
    ReactDOM.createPortal = jest.fn((element, node) => {
      return element;
    });
  });

  afterEach(() => {
    ReactDOM.createPortal.mockClear();
  });

  test("should render the account username and logout button", () => {
    render(
      <MemoryRouter>
        <ProfileModalComponent account={{username: "Peng"}} />
      </MemoryRouter>
    );

    expect(screen.getByText(/Peng/i)).toBeInTheDocument();
    expect(screen.getByText(/logout/i)).toBeInTheDocument();
  });
});
