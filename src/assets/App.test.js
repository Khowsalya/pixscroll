import { render, screen, fireEvent } from "@testing-library/react";
import Button from "../Components/Button/Button.jsx";

test("Button component renders with correct text and handles click events", () => {
  const handleClick = jest.fn();
  render(
    <Button
      buttonType="button"
      onClick={handleClick}
      buttonText="Click Me"
      disabled={false}
    />,
  );
  const renderedButton = screen.getByText("Click Me");
  fireEvent.click(renderedButton);
  expect(handleClick).toHaveBeenCalledTimes(1);
});

// import { render } from "@testing-library/react";
// import App from "../App.jsx";

// test("renders app", () => {
//   render(<App />);
// });
