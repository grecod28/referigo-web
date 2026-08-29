import { render, screen, fireEvent, within } from "@testing-library/react";
import HeaderSearchBar from "@/components/layout/header-search-bar";

describe("HeaderSearchBar", () => {
  it("renders the search input by default for desktop", () => {
    render(<HeaderSearchBar />);

    const inputs = screen.getAllByRole("textbox");
    expect(inputs).toHaveLength(1);
    expect(inputs[0]).toHaveAttribute("name", "q");
  });

  it("renders the mobile search icon button closed by default", () => {
    render(<HeaderSearchBar />);

    const toggle = screen.getByRole("button", { name: "Abrir buscador" });
    expect(toggle).toBeInTheDocument();
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("opens the search overlay with a black centered panel on click", () => {
    render(<HeaderSearchBar />);

    fireEvent.click(screen.getByRole("button", { name: "Abrir buscador" }));

    const dialog = screen.getByRole("dialog", { name: "Buscador" });
    expect(dialog).toHaveClass("bg-black");
    expect(dialog).toHaveClass("justify-center");
    expect(dialog).toHaveClass("items-start");
    expect(screen.getByRole("button", { name: "Abrir buscador" })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
  });

  it("autofocuses the search input when the overlay opens", () => {
    render(<HeaderSearchBar />);

    fireEvent.click(screen.getByRole("button", { name: "Abrir buscador" }));

    const dialog = screen.getByRole("dialog", { name: "Buscador" });
    const input = within(dialog).getByRole("textbox");
    expect(input).toHaveAttribute("name", "q");
    expect(document.activeElement).toBe(input);
  });

  it("closes when Escape is pressed", () => {
    render(<HeaderSearchBar />);

    fireEvent.click(screen.getByRole("button", { name: "Abrir buscador" }));
    fireEvent.keyDown(document, { key: "Escape" });

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("closes when the backdrop is clicked", () => {
    render(<HeaderSearchBar />);

    fireEvent.click(screen.getByRole("button", { name: "Abrir buscador" }));

    fireEvent.click(screen.getByRole("dialog", { name: "Buscador" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("has no close button and relies on the backdrop", () => {
    render(<HeaderSearchBar />);

    fireEvent.click(screen.getByRole("button", { name: "Abrir buscador" }));

    const dialog = screen.getByRole("dialog", { name: "Buscador" });
    expect(
      within(dialog).queryByRole("button", { name: "Cerrar buscador" }),
    ).not.toBeInTheDocument();
  });

  it("does not close when the panel itself is clicked", () => {
    render(<HeaderSearchBar />);

    fireEvent.click(screen.getByRole("button", { name: "Abrir buscador" }));

    const dialog = screen.getByRole("dialog", { name: "Buscador" });
    fireEvent.click(within(dialog).getByRole("textbox"));

    expect(screen.getByRole("dialog", { name: "Buscador" })).toBeInTheDocument();
  });

  it("submits to /search from the overlay", () => {
    render(<HeaderSearchBar />);

    fireEvent.click(screen.getByRole("button", { name: "Abrir buscador" }));

    const dialog = screen.getByRole("dialog", { name: "Buscador" });
    const form = within(dialog).getByRole("textbox").closest("form");
    expect(form).toHaveAttribute("action", "/search");
    expect(form).toHaveAttribute("method", "GET");
  });

  it("supports repeated open/close cycles", () => {
    render(<HeaderSearchBar />);

    const toggle = screen.getByRole("button", { name: "Abrir buscador" });

    for (let i = 0; i < 3; i++) {
      fireEvent.click(toggle);
      expect(screen.getByRole("dialog", { name: "Buscador" })).toBeInTheDocument();

      fireEvent.keyDown(document, { key: "Escape" });
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    }
  });

  it("does not react to Escape when closed", () => {
    render(<HeaderSearchBar />);

    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
