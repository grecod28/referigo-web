import { render, screen, fireEvent } from "@testing-library/react";
import type { ReactNode } from "react";
import { Sidebar } from "@/components/layout/sidebars";

jest.mock("next/navigation", () => ({
  usePathname: () => "/es/coupons",
}));

jest.mock("@/config/i18n/navigation", () => ({
  Link: ({
    href,
    className,
    children,
    ...rest
  }: {
    href: string;
    className?: string;
    children: ReactNode;
  }) => (
    <a href={href} className={className} {...rest}>
      {children}
    </a>
  ),
}));

function renderSidebar(props: Partial<Parameters<typeof Sidebar>[0]> = {}) {
  return render(
    <Sidebar
      open={false}
      collapsed={false}
      onClose={jest.fn()}
      onToggleCollapse={jest.fn()}
      {...props}
    />,
  );
}

describe("Sidebar", () => {
  it("renders the logo and wordmark", () => {
    renderSidebar();

    expect(screen.getByRole("link", { name: /Referigo/ })).toHaveAttribute(
      "href",
      "/",
    );
  });

  it("renders the Home link and all sections with their items", () => {
    renderSidebar();

    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();

    const mainPages = screen.getByRole("navigation", { name: "Main pages" });
    expect(mainPages).toHaveTextContent("Main pages");
    for (const href of ["/coupons", "/offers", "/stores", "/restaurants"]) {
      expect(mainPages.querySelector(`a[href="${href}"]`)).not.toBeNull();
    }

    const extraPages = screen.getByRole("navigation", { name: "Extra pages" });
    expect(extraPages).toHaveTextContent("Extra pages");
    expect(extraPages.querySelector('a[href="/account"]')).not.toBeNull();
  });

  it("marks the active route with aria-current", () => {
    renderSidebar();

    expect(screen.getByRole("link", { name: "Coupons" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(screen.getByRole("link", { name: "Home" })).not.toHaveAttribute(
      "aria-current",
    );
  });

  it("hides on mobile when closed and shows when open", () => {
    const { rerender } = renderSidebar();
    const sidebar = screen.getByRole("complementary", { name: "Sidebar" });

    expect(sidebar).toHaveClass("-translate-x-full");

    rerender(
      <Sidebar
        open
        collapsed={false}
        onClose={jest.fn()}
        onToggleCollapse={jest.fn()}
      />,
    );

    expect(sidebar).toHaveClass("translate-x-0");
  });

  it("closes when the overlay is clicked", () => {
    const onClose = jest.fn();
    const { baseElement } = renderSidebar({ open: true, onClose });

    const overlay = baseElement.querySelector('div[aria-hidden="true"]');
    expect(overlay).not.toBeNull();

    fireEvent.click(overlay!);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("closes when the close button is clicked", () => {
    const onClose = jest.fn();
    renderSidebar({ open: true, onClose });

    fireEvent.click(screen.getByRole("button", { name: "Cerrar menú" }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("closes when Escape is pressed while open", () => {
    const onClose = jest.fn();
    renderSidebar({ open: true, onClose });

    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("does not close with Escape when closed", () => {
    const onClose = jest.fn();
    renderSidebar({ open: false, onClose });

    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).not.toHaveBeenCalled();
  });

  it("toggles collapse with the bottom button", () => {
    const onToggleCollapse = jest.fn();
    renderSidebar({ onToggleCollapse });

    const button = screen.getByRole("button", {
      name: "Contraer sidebar",
    });
    fireEvent.click(button);

    expect(onToggleCollapse).toHaveBeenCalledTimes(1);
  });

  it("hides labels when collapsed", () => {
    renderSidebar({ collapsed: true });

    expect(
      screen.getByRole("link", { name: "Coupons" }).querySelector("span"),
    ).toHaveClass("md:hidden");
    expect(
      screen.getByRole("button", { name: "Expandir sidebar" }),
    ).toBeInTheDocument();
  });
});
