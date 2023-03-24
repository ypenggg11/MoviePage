import { screen, render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { LoginFormComponent } from "./LoginFormComponent";

describe("LoginForm component", () => {
  test("login button sould not be disabled when input is detected in both textfields", () => {
    render(<LoginFormComponent onCloseForm={() => {}} />);

    const usernameInput = screen.getByLabelText("Username");
    const passwordInput = screen.getByLabelText("Password");

    fireEvent.change(usernameInput, { target: { value: "username" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });

    expect(screen.getByRole("button", { name: "Login" })).not.toBeDisabled();
  });

  test("should login when the button is clicked and the credentials are correct", () => {
    const loginHandler = jest.fn();

    const username = "username";
    const password = "password";

    render(<LoginFormComponent onCloseForm={() => {}} />);

    const usernameInput = screen.getByLabelText("Username");
    const passwordInput = screen.getByLabelText("Password");

    loginHandler.mockImplementation(() => {
      return (
        username === usernameInput.value && password === passwordInput.value
      );
    });

    fireEvent.change(usernameInput, { target: { value: username } });
    fireEvent.change(passwordInput, { target: { value: password } });

    const loginButton = screen.getByRole("button", { name: "Login" });
    loginButton.onclick = loginHandler;

    fireEvent.click(loginButton);

    expect(loginHandler).toHaveReturnedWith(true);
  });
});
