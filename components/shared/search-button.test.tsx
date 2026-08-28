import { render, screen } from "@testing-library/react";
import SearchButton from "@/components/shared/search-button";

function getForm(container: HTMLElement) {
  const form = container.querySelector("form");
  if (!form) throw new Error("form not found");
  return form;
}

describe("SearchButton", () => {
  it("renders a GET form to /search with an input named q by default", () => {
    const { container } = render(<SearchButton />);

    const form = getForm(container);
    expect(form).toHaveAttribute("action", "/search");
    expect(form).toHaveAttribute("method", "GET");

    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("name", "q");

    expect(form.querySelector("button")).toHaveAttribute("type", "submit");
  });

  it("uses a custom action when provided", () => {
    const { container } = render(<SearchButton action="/products" />);
    expect(getForm(container)).toHaveAttribute("action", "/products");
  });

  it("applies className to the form", () => {
    const { container } = render(<SearchButton className="w-full max-w-md" />);
    expect(getForm(container)).toHaveClass("w-full", "max-w-md");
  });

  it("renders params as hidden inputs", () => {
    const { container } = render(
      <SearchButton
        params={{ category: "libros", sort: "relevance", count: 10, active: false }}
      />,
    );

    const hiddenInputs = getForm(container).querySelectorAll(
      'input[type="hidden"]',
    );
    expect(hiddenInputs).toHaveLength(4);

    expect(hiddenInputs[0]).toHaveAttribute("name", "category");
    expect(hiddenInputs[0]).toHaveAttribute("value", "libros");
    expect(hiddenInputs[2]).toHaveAttribute("value", "10");
    expect(hiddenInputs[3]).toHaveAttribute("value", "false");
  });

  it("skips null and undefined params", () => {
    const { container } = render(
      <SearchButton
        params={{ category: "libros", ignored: null, missing: undefined }}
      />,
    );

    const hiddenInputs = getForm(container).querySelectorAll(
      'input[type="hidden"]',
    );
    expect(hiddenInputs).toHaveLength(1);
    expect(hiddenInputs[0]).toHaveAttribute("name", "category");
    expect(hiddenInputs[0]).toHaveAttribute("value", "libros");
  });

  it("overrides the input props through inputProps", () => {
    render(
      <SearchButton
        inputProps={{ name: "query", placeholder: "Buscar productos..." }}
      />,
    );

    const input = screen.getByPlaceholderText("Buscar productos...");
    expect(input).toHaveAttribute("name", "query");
  });
});
