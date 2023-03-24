// FAILED

import { screen, render } from "@testing-library/react";
import Profile from "./Profile";
import ReactDOM from "react-dom";
// import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
// import useFetch from "../../hooks/useFetch";
// import { act } from "react-dom/test-utils";

// jest.mock("../../hooks/useFetch", () => ({
//   useFetch: () => ({ data: { id: 1, username: "Peng" }, isLoading: false }),
// }));

describe("Profile component", () => {
  beforeAll(() => {
    ReactDOM.createPortal = jest.fn((element, node) => {
      return element;
    });
  });

  afterEach(() => {
    ReactDOM.createPortal.mockClear();
  });

  test("test", () => {
    render(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>
    );
  });

  // test("should render username and logout on mount", async () => {
  //   jest.spyOn(useFetch, "useFetch").mockImplementation(() => ({
  //     data: { id: 1, username: "Peng" },
  //     isLoading: false,
  //   }));

  //   await act(async () => {
  //     render(
  //       <MemoryRouter>
  //         <Profile />
  //       </MemoryRouter>
  //     );
  //   });

  //   expect(screen.getByText("Peng")).toBeInTheDocument();
  // });
});
