import React, {useState} from "react";
import { render, screen } from "@testing-library/react";
import ReactDOM from "react-dom";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import AuthModalComponent from "./AuthModalComponent";

jest.mock('react', () => ({
	...jest.requireActual('react'),
	useState: jest.fn()
}))
const setState = jest.fn()

describe("AuthModal Component", () => {
  beforeAll(() => {
    ReactDOM.createPortal = jest.fn((element, node) => {
      return element;
    });
  });

  beforeEach(() => {
    useState.mockImplementation((init) => [init, setState]);
  });

  afterEach(() => {
    ReactDOM.createPortal.mockClear();
  });

  test("should render an alert if the credentials are invalid", async () => {
    useState.mockImplementation

    render(
      <MemoryRouter>
        <AuthModalComponent />
      </MemoryRouter>
    );

    expect(screen.getByText(/Wrong username or password/i)).toBeInTheDocument();
  });
});
