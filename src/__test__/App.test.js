import { render, screen, fireEvent, expect } from "@testing-library/react";
import Button from "../Components/Button/Button.jsx";

// seond test
// test("Button component renders with correct text and handles click events", () => {
//   const handleClick = jest.fn();
//   render(
//     <Button
//       buttonType="button"
//       onClick={handleClick}
//       buttonText="Click Me"
//       disabled={false}
//     />,
//   );
//   const renderedButton = screen.getByText("Click Me");
//   fireEvent.click(renderedButton);
//   expect(handleClick).toHaveBeenCalledTimes(1);
// });
// ----------------------------------------------------------------------------------

// first test

// import { render } from "@testing-library/react";
// import App from "../App.jsx";

// test("renders app", () => {
//   render(<App />);
// });

describe("Button Component", () => {
  test("renders button text", () => {
    render(<Button buttonText="Click Me" buttonType="button" />);
    const buttonElement = screen.getByText("Click Me");
    expect(buttonElement).toBeInTheDocument();
  });

  test("calls onClick when clicked", () => {
    const handleClick = jest.fn();

    render(
      <Button
        buttonText="Click Me"
        buttonType="button"
        onClick={handleClick}
      />,
    );

    const buttonElement = screen.getByRole("button");
    fireEvent.click(buttonElement);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("renders disabled button", () => {
    render(
      <Button buttonText="Click Me" buttonType="button" disabled={true} />,
    );

    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toBeDisabled();
  });

  test("does not call onClick when disabled", () => {
    const handleClick = jest.fn();

    render(
      <Button
        buttonText="Click Me"
        buttonType="button"
        disabled={true}
        onClick={handleClick}
      />,
    );
    const buttonElement = screen.getByRole("button");
    fireEvent.click(buttonElement);

    expect(handleClick).not.toHaveBeenCalled();
  });

  test("passes buttonType prop correctly", () => {
    render(<Button buttonText="Reset" buttonType="reset" />);

    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toHaveAttribute("type", "reset");
  });
});
