import { render } from "@testing-library/react";
import UserMenu from "@/components/layout/user-menu";

describe("UserMenu", () => {
  it("renders the profile icon", () => {
    const { container } = render(<UserMenu />);
    expect(container.querySelectorAll("svg")).toHaveLength(1);
  });

  it("does not show notifications when logged out", () => {
    const { container } = render(<UserMenu />);
    expect(container.querySelectorAll("svg")).toHaveLength(1);
  });
});
