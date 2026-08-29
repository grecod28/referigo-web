import { render, fireEvent } from "@testing-library/react";
import { Header } from "@/components/layout/header";

describe("Header", () => {
  it("renders the search form", () => {
    const { container } = render(<Header />);

    const form = container.querySelector("form");
    expect(form).not.toBeNull();
    expect(form).toHaveAttribute("action", "/search");
  });

  it("renders the header icons", () => {
    const { container } = render(<Header />);

    expect(container.querySelectorAll("svg")).toHaveLength(5);
  });

  it("opens the sidebar menu when the hamburger button is clicked", () => {
    const onOpenSidebar = jest.fn();

    const { getByRole } = render(<Header onOpenSidebar={onOpenSidebar} />);

    const hamburger = getByRole("button", { name: "Abrir menú" });
    expect(hamburger).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(hamburger);
    expect(onOpenSidebar).toHaveBeenCalledTimes(1);
  });

  it("reflects the sidebar state in aria-expanded", () => {
    const { getByRole } = render(
      <Header sidebarOpen onOpenSidebar={jest.fn()} />,
    );

    expect(getByRole("button", { name: "Abrir menú" })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
  });
});
