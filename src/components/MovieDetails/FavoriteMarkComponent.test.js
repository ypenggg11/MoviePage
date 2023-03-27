import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { FavoriteMarkComponent } from "./FavoriteMarkComponent";

describe("FavoriteMark Component", () => {
  test("should render the checked icon if it's checked", () => {
    render(<FavoriteMarkComponent onChange={() => {}} isChecked={true} />);

    expect(screen.getByRole("checkbox")).toBeChecked();
    expect(screen.getByLabelText("checked-icon")).toBeInTheDocument();
  });
});
