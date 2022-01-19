import { render, screen } from "@testing-library/react";
import SearchPage from ".";

test("renders SearchBar correctly", () => {
  render(<SearchPage />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
