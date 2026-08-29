import { render, screen, fireEvent } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import SearchForm from "./search-form";
import messages from "@/config/i18n/messages/es.json";

function getForm(container: HTMLElement) {
  const form = container.querySelector("form");
  if (!form) throw new Error("form not found");
  return form;
}

describe("Home SearchForm", () => {
  it("renders a GET form with a q input and its translated placeholder", () => {
    const { container } = render(
      <NextIntlClientProvider locale="es" messages={messages}>
        <SearchForm />
      </NextIntlClientProvider>,
    );

    const form = getForm(container);
    expect(form).toHaveAttribute("method", "GET");
    expect(form).toHaveAttribute("action", "/search");

    const input = screen.getByPlaceholderText(
      "Busca ofertas, tiendas, cupones y promociones...",
    );
    expect(input).toHaveAttribute("name", "q");
  });

  it("renders the type select with Todos selected by default", () => {
    render(
      <NextIntlClientProvider locale="es" messages={messages}>
        <SearchForm />
      </NextIntlClientProvider>,
    );

    const select = screen.getByRole("combobox", { name: "Tipo de búsqueda" });
    expect(select).toHaveValue("all");

    const options = screen.getAllByRole("option");
    expect(options).toHaveLength(5);
    expect(options.map((option) => option.textContent)).toEqual([
      "Todos",
      "Ofertas",
      "Cupones",
      "Tiendas",
      "Restaurantes",
    ]);
  });

  it.each([
    ["offers", "/offers/search"],
    ["coupons", "/coupons/search"],
    ["stores", "/stores/search"],
    ["restaurants", "/restaurants/search"],
  ])("sends the form to %s when the %s type is selected", (value, expectedAction) => {
    const { container } = render(
      <NextIntlClientProvider locale="es" messages={messages}>
        <SearchForm />
      </NextIntlClientProvider>,
    );

    fireEvent.change(screen.getByRole("combobox"), { target: { value } });

    expect(getForm(container)).toHaveAttribute("action", expectedAction);
  });

  it("keeps /search as the action when Todos is selected again", () => {
    const { container } = render(
      <NextIntlClientProvider locale="es" messages={messages}>
        <SearchForm />
      </NextIntlClientProvider>,
    );

    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "offers" } });
    fireEvent.change(select, { target: { value: "all" } });

    expect(getForm(container)).toHaveAttribute("action", "/search");
  });

  it("preserves the typed text in the q input", () => {
    render(
      <NextIntlClientProvider locale="es" messages={messages}>
        <SearchForm />
      </NextIntlClientProvider>,
    );

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "iphone" } });

    expect(input).toHaveValue("iphone");
  });

  it("does not submit the select as an extra parameter", () => {
    const { container } = render(
      <NextIntlClientProvider locale="es" messages={messages}>
        <SearchForm />
      </NextIntlClientProvider>,
    );

    expect(getForm(container).querySelector("select[name]")).toBeNull();
  });
});
