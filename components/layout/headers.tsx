import { useTranslations } from "next-intl";
import Navbar from "./navbar";

export function Header() {
  const t = useTranslations("header");

  const routes = [
    { href: "/", label: t("nav.home") },
    { href: "/offers", label: t("nav.offers") },
    { href: "/coupons", label: t("nav.coupons") },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
        <section className="flex items-center gap-8">
          <h2 className="font-display text-xl font-bold text-primary">
            {t("brand")}
          </h2>
          <Navbar className="flex gap-4" routes={routes} />
        </section>

        <section className="flex items-center gap-3"></section>
      </div>
    </header>
  );
}
