import { render, screen, fireEvent } from "@testing-library/react";
import { Modal } from "@/components/ui/modal";

describe("Modal", () => {
  it("renders nothing when closed", () => {
    render(
      <Modal open={false} onClose={jest.fn()}>
        Contenido
      </Modal>,
    );

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renders the dialog with title, description and children when open", () => {
    render(
      <Modal
        open
        onClose={jest.fn()}
        title="Título del modal"
        description="Descripción del modal"
      >
        <p>Contenido del modal</p>
      </Modal>,
    );

    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(dialog).toHaveAttribute("aria-labelledby", "modal-title");
    expect(dialog).toHaveAttribute("aria-describedby", "modal-description");

    expect(screen.getByText("Título del modal")).toBeInTheDocument();
    expect(screen.getByText("Descripción del modal")).toBeInTheDocument();
    expect(screen.getByText("Contenido del modal")).toBeInTheDocument();
  });

  it("calls onClose when the close button is clicked", () => {
    const onClose = jest.fn();

    render(<Modal open onClose={onClose}>Contenido</Modal>);

    fireEvent.click(screen.getByRole("button", { name: "Cerrar" }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when the overlay is clicked", () => {
    const onClose = jest.fn();
    const { baseElement } = render(
      <Modal open onClose={onClose}>
        Contenido
      </Modal>,
    );

    const overlay = baseElement.querySelector('[class*="bg-foreground"]');
    expect(overlay).not.toBeNull();
    fireEvent.click(overlay!);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when Escape is pressed", () => {
    const onClose = jest.fn();

    render(<Modal open onClose={onClose}>Contenido</Modal>);

    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("does not react to Escape when closed", () => {
    const onClose = jest.fn();

    render(
      <Modal open={false} onClose={onClose}>
        Contenido
      </Modal>,
    );

    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).not.toHaveBeenCalled();
  });

  it("locks body overflow while open and restores it when closed", () => {
    const onClose = jest.fn();
    const { rerender } = render(
      <Modal open onClose={onClose}>
        Contenido
      </Modal>,
    );

    expect(document.body.style.overflow).toBe("hidden");

    rerender(
      <Modal open={false} onClose={onClose}>
        Contenido
      </Modal>,
    );

    expect(document.body.style.overflow).toBe("");
  });
});
