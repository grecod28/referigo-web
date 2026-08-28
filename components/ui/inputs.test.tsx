import { render, screen } from "@testing-library/react";
import { Field } from "@/components/ui/inputs";

describe("Field", () => {
  describe("as input", () => {
    it("renders an input with name and placeholder", () => {
      render(<Field name="email" placeholder="correo@ejemplo.com" />);

      const input = screen.getByPlaceholderText("correo@ejemplo.com");
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute("name", "email");
    });

    it("renders a label linked to the input", () => {
      render(<Field label="Correo electrónico" />);

      const input = screen.getByLabelText("Correo electrónico");
      expect(input).toHaveAttribute("id", "correo-electrónico");
    });

    it("shows the error message and marks the input invalid", () => {
      render(<Field id="email" label="Correo" error="Correo inválido" />);

      const input = screen.getByLabelText("Correo");
      expect(input).toHaveAttribute("aria-invalid", "true");
      expect(input).toHaveAttribute("aria-describedby", "email-error");
      expect(screen.getByRole("alert")).toHaveTextContent("Correo inválido");
    });

    it("shows helper text and does not show an error", () => {
      render(<Field id="email" label="Correo" helperText="Te enviaremos un enlace" />);

      expect(screen.getByText("Te enviaremos un enlace")).toBeInTheDocument();
      expect(screen.queryByRole("alert")).not.toBeInTheDocument();
      expect(screen.getByLabelText("Correo")).toHaveAttribute(
        "aria-describedby",
        "email-helper",
      );
    });
  });

  describe("as textarea", () => {
    it("renders a textarea", () => {
      render(<Field as="textarea" name="comment" />);
      expect(screen.getByRole("textbox")).toHaveAttribute("name", "comment");
    });

    it("renders label and error for textarea", () => {
      render(
        <Field
          as="textarea"
          id="comment"
          label="Comentario"
          error="Requerido"
        />,
      );

      expect(screen.getByLabelText("Comentario")).toHaveAttribute(
        "aria-invalid",
        "true",
      );
      expect(screen.getByRole("alert")).toHaveTextContent("Requerido");
    });
  });

  describe("as select", () => {
    const options = [
      { value: "ar", label: "Argentina" },
      { value: "uy", label: "Uruguay" },
      { value: "cl", label: "Chile", disabled: true },
    ];

    it("renders a select with all options", () => {
      render(
        <Field as="select" name="country" options={options} label="País" />,
      );

      const select = screen.getByLabelText("País");
      expect(select).toHaveAttribute("name", "country");

      const optionElements = screen.getAllByRole("option");
      expect(optionElements).toHaveLength(3);
      expect(screen.getByRole("option", { name: "Argentina" })).toHaveValue(
        "ar",
      );
      expect(screen.getByRole("option", { name: "Chile" })).toBeDisabled();
    });

    it("renders a disabled placeholder option when provided", () => {
      render(
        <Field as="select" name="country" options={options} placeholder="Elegí un país" />,
      );

      const placeholder = screen.getByRole("option", { name: "Elegí un país" });
      expect(placeholder).toHaveValue("");
      expect(placeholder).toBeDisabled();
    });
  });
});
