import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "@/components/ui/buttons";

describe("Button", () => {
  it("renders its children", () => {
    render(<Button>Enviar</Button>);
    expect(screen.getByRole("button", { name: "Enviar" })).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const onClick = jest.fn();

    render(<Button onClick={onClick}>Click</Button>);
    fireEvent.click(screen.getByRole("button", { name: "Click" }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("renders with type submit when provided", () => {
    render(<Button type="submit">Guardar</Button>);
    expect(screen.getByRole("button", { name: "Guardar" })).toHaveAttribute(
      "type",
      "submit",
    );
  });

  it("is disabled and ignores clicks when disabled", () => {
    const onClick = jest.fn();

    render(
      <Button disabled onClick={onClick}>
        Deshabilitado
      </Button>,
    );

    const button = screen.getByRole("button", { name: "Deshabilitado" });
    expect(button).toBeDisabled();

    fireEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("applies custom className along with defaults", () => {
    render(<Button className="custom-class">Con clase</Button>);
    const button = screen.getByRole("button", { name: "Con clase" });
    expect(button).toHaveClass("custom-class");
    expect(button).toHaveClass("inline-flex");
  });
});
