import { render } from "@testing-library/react";
import { Header } from "@/components/layout/header";

describe("Header", () => {
  it("renders the search form", () => {
    const { container } = render(<Header />);

    const form = container.querySelector("form");
    expect(form).not.toBeNull();
    expect(form).toHaveAttribute("action", "/search");
  });

  it("renders the notification and profile icons", () => {
    const { container } = render(<Header />);

    expect(container.querySelectorAll("svg")).toHaveLength(2);
  });
});
