import { useTranslations } from "next-intl";
import SearchForm from "./_views/search-form";

export default function Home() {
  const t = useTranslations("home");

  return (
    <main className="flex min-h-screen flex-col items-center p-24 gap-10">
      <section>
        <h1 className="text-4xl font-bold">
          {t("title")} <span className="text-brand-500">Referigo</span>
        </h1>
        <p className="mt-2 text-text-disabled text-center text-lg">
          {t("description")}
        </p>
      </section>

      <section className="w-full max-w-160 ">
        <SearchForm />

        <footer className="mt-4">
          <p className="text-center">{t("search.description")}</p>
        </footer>
      </section>
    </main>
  );
}
