import { render } from "@testing-library/react";
import type { ReactNode } from "react";
import UserMenu from "@/components/layout/user-menu";

jest.mock("@/config/i18n/navigation", () => ({
  Link: ({
    href,
    children,
  }: {
    href: string;
    children: ReactNode;
  }) => <a href={href}>{children}</a>,
}));

describe("UserMenu", () => {
  it("renders the profile icon", () => {
    const { container } = render(<UserMenu />);
    expect(container.querySelectorAll("svg")).toHaveLength(1);
  });

  it("does not show notifications when logged out", () => {
    const { container } = render(<UserMenu />);
    expect(container.querySelectorAll("svg")).toHaveLength(1);
  });

  it("links to the login page when logged out", () => {
    render(<UserMenu />);

    const link = document.querySelector("a");
    expect(link).not.toBeNull();
    expect(link).toHaveAttribute("href", "/login");
  });
});
