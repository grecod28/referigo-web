import { render, screen, fireEvent } from "@testing-library/react";
import type { ReactNode } from "react";
import MainShell from "@/components/layout/main-shell";

jest.mock("next/navigation", () => ({
  usePathname: () => "/es",
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

describe("MainShell", () => {
  it("renders the header, sidebar and children", () => {
    const { container } = render(
      <MainShell>
        <p>Contenido principal</p>
      </MainShell>,
    );

    expect(container.querySelector("form")).not.toBeNull();
    expect(
      screen.getByRole("complementary", { name: "Sidebar" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Contenido principal")).toBeInTheDocument();
  });

  it("offsets the content next to the expanded sidebar on desktop", () => {
    const { container } = render(
      <MainShell>
        <p>Contenido</p>
      </MainShell>,
    );

    const wrapper = container.querySelector(
      '[class*="transition-[padding-left]"]',
    );
    expect(wrapper).toHaveClass("md:pl-56", "lg:pl-60");
  });

  it("opens the sidebar from the hamburger and closes it via the overlay", () => {
    const { baseElement } = render(
      <MainShell>
        <p>Contenido</p>
      </MainShell>,
    );

    const sidebar = screen.getByRole("complementary", { name: "Sidebar" });
    expect(sidebar).toHaveClass("-translate-x-full");

    fireEvent.click(screen.getByRole("button", { name: "Abrir menú" }));
    expect(sidebar).toHaveClass("translate-x-0");

    const overlay = baseElement.querySelector('div[aria-hidden="true"]');
    expect(overlay).toHaveClass("opacity-100");

    fireEvent.click(overlay!);
    expect(sidebar).toHaveClass("-translate-x-full");
  });

  it("collapses the sidebar with the bottom button", () => {
    const { container } = render(
      <MainShell>
        <p>Contenido</p>
      </MainShell>,
    );

    fireEvent.click(
      screen.getByRole("button", { name: "Contraer sidebar" }),
    );

    const wrapper = container.querySelector(
      '[class*="transition-[padding-left]"]',
    );
    expect(wrapper).toHaveClass("md:pl-20");
  });
});
