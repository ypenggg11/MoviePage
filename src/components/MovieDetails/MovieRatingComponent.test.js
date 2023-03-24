import { screen, render, fireEvent } from "@testing-library/react";
import { MovieRatingComponent } from "./MovieRatingComponent";

describe("MovieRating component", () => {
  test("should set the rating value to the clicked value", () => {
    render(
      <MovieRatingComponent rateValue={1} status={{}} onChange={() => {}} />
    );

    let rating;

    const fourRating = screen.getByRole("radio", { name: "4 Stars" });
    fourRating.onclick = () => (rating = fourRating.value);

    const threeRating = screen.getByRole("radio", { name: "3 Stars" });
    threeRating.onclick = () => (rating = threeRating.value);

    fireEvent.click(fourRating);
    fireEvent.click(threeRating);

    expect(rating).toBe("3");
  });
});
