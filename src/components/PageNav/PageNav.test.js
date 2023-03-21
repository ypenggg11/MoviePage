import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import PageNav from "./PageNav";
import PaginationContext from "../../store/pagination-context";

describe("PageNav component", () => {
  test("should not render the prev button on the first page", () => {
    render(
      <MemoryRouter>
        <PaginationContext.Provider value={{ page: 1, maxPages: 500 }}>
          <PageNav />
        </PaginationContext.Provider>
      </MemoryRouter>
    );

    expect(
      screen.queryByRole("button", { name: "left-nav" })
    ).not.toBeInTheDocument();
  });

  test("should not render the next button on the last page", () => {
    render(
      <MemoryRouter>
        <PaginationContext.Provider value={{ page: 500, maxPages: 500 }}>
          <PageNav />
        </PaginationContext.Provider>
      </MemoryRouter>
    );

    expect(
      screen.queryByRole("button", { name: "right-nav" })
    ).not.toBeInTheDocument();
  });

  test("should  render both buttons on any other pages", () => {
    render(
      <MemoryRouter>
        <PaginationContext.Provider value={{ page: 4, maxPages: 500 }}>
          <PageNav />
        </PaginationContext.Provider>
      </MemoryRouter>
    );

    expect(
      screen.queryByRole("button", { name: "left-nav" })
    ).toBeInTheDocument();

    expect(
      screen.queryByRole("button", { name: "right-nav" })
    ).toBeInTheDocument();
  });
});
