import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import Navbar from "@/components/layout/navbar";
import type { Route } from "@/types/navigation";

jest.mock("next/navigation", () => ({
  usePathname: () => "/es/discount-codes",
}));

jest.mock("@/config/i18n/navigation", () => ({
  Link: ({
    href,
    className,
    children,
  }: {
    href: string;
    className?: string;
    children: ReactNode;
  }) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}));

const routes: Route[] = [
  { href: "/", label: "Inicio" },
  { href: "/discount-codes", label: "Códigos" },
  { href: "/stores", label: "Tiendas" },
];

describe("Navbar", () => {
  it("renders a link for each route", () => {
    render(<Navbar routes={routes} className="flex gap-4" />);

    const inicio = screen.getByRole("link", { name: "Inicio" });
    const codigos = screen.getByRole("link", { name: "Códigos" });
    const tiendas = screen.getByRole("link", { name: "Tiendas" });

    expect(inicio).toHaveAttribute("href", "/");
    expect(codigos).toHaveAttribute("href", "/discount-codes");
    expect(tiendas).toHaveAttribute("href", "/stores");
  });

  it("applies className to the nav element", () => {
    const { container } = render(
      <Navbar routes={routes} className="flex gap-4" />,
    );

    expect(container.querySelector("nav")).toHaveClass("flex", "gap-4");
  });

  it("highlights the active route ignoring the locale prefix", () => {
    render(<Navbar routes={routes} className="" />);

    expect(screen.getByRole("link", { name: "Códigos" })).toHaveClass(
      "text-primary",
    );
    expect(screen.getByRole("link", { name: "Tiendas" })).not.toHaveClass(
      "text-primary",
    );
  });

  it("highlights the root route when the path starts with it", () => {
    render(<Navbar routes={routes} className="" />);

    expect(screen.getByRole("link", { name: "Inicio" })).toHaveClass(
      "text-primary",
    );
  });
});
