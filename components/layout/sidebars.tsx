"use client";

import { useEffect, type ComponentType } from "react";
import { usePathname } from "next/navigation";
import {
  IoArrowBackOutline,
  IoChevronForward,
  IoClose,
  IoHomeOutline,
  IoPersonOutline,
  IoPricetagOutline,
  IoRestaurantOutline,
  IoStorefrontOutline,
  IoTicketOutline,
} from "react-icons/io5";
import { Link } from "@/config/i18n/navigation";
import { getPathWithoutLocale } from "@/lib/utils";

type SidebarItem = {
  href: string;
  label: string;
  icon: ComponentType<{ size?: number | string; className?: string }>;
};

const mainPages: SidebarItem[] = [
  { href: "/coupons", label: "Coupons", icon: IoTicketOutline },
  { href: "/offers", label: "Offers", icon: IoPricetagOutline },
  { href: "/stores", label: "Stores", icon: IoStorefrontOutline },
  { href: "/restaurants", label: "Restaurant", icon: IoRestaurantOutline },
];

const extraPages: SidebarItem[] = [
  { href: "/account", label: "Account Pages", icon: IoPersonOutline },
];

type SidebarProps = {
  open: boolean;
  collapsed: boolean;
  onClose: () => void;
  onToggleCollapse: () => void;
};

export function Sidebar({
  open,
  collapsed,
  onClose,
  onToggleCollapse,
}: SidebarProps) {
  const pathname = usePathname();
  const cleanPath = getPathWithoutLocale(pathname);

  const isActive = (href: string) =>
    href === "/" ? cleanPath === "/" : cleanPath.startsWith(href);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;

    const desktopQuery = window.matchMedia?.("(min-width: 768px)");
    if (desktopQuery?.matches) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const itemClasses = (active: boolean) =>
    `group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-text-muted transition-colors duration-200 hover:bg-surface-hover hover:text-text ${
      active ? "bg-brand-900/60 text-text" : ""
    } ${collapsed ? "md:justify-center md:px-0" : ""}`;

  return (
    <>
      <div
        aria-hidden="true"
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/60 transition-opacity duration-300 md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        aria-label="Sidebar"
        className={`fixed inset-y-0 left-0 z-50 flex w-60 flex-col bg-surface transition-[width,transform] duration-300 ease-in-out md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        } ${collapsed ? "md:w-20" : "md:w-56 lg:w-60"}`}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar menú"
          className="absolute right-3 top-3 flex size-8 items-center justify-center rounded-full text-text-muted transition-colors duration-200 hover:bg-surface-hover hover:text-text md:hidden"
        >
          <IoClose size={18} />
        </button>

        <div className="flex items-center justify-center px-4 py-6">
          <Link
            href="/"
            onClick={onClose}
            className={`flex items-center gap-2.5 ${collapsed ? "md:gap-0" : ""}`}
          >
            <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-brand-600 text-lg font-bold text-white">
              R
            </span>
            <span
              className={`text-lg font-semibold text-text ${
                collapsed ? "md:hidden" : ""
              }`}
            >
              Referigo
            </span>
          </Link>
        </div>

        <div className="mx-5 h-px bg-border" />

        <nav aria-label="Principal" className="mt-2 px-3">
          <Link href="/" onClick={onClose} className={itemClasses(isActive("/"))}>
            <IoHomeOutline size={18} className="shrink-0" />
            <span className={collapsed ? "md:hidden" : ""}>Home</span>
          </Link>
        </nav>

        <div className="mx-5 mt-2 h-px bg-border" />

        <nav aria-label="Main pages" className="flex flex-col gap-1 px-3 pt-4">
          <p
            className={`px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-text-disabled ${
              collapsed ? "md:hidden" : ""
            }`}
          >
            Main pages
          </p>
          {mainPages.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              aria-current={isActive(href) ? "page" : undefined}
              className={itemClasses(isActive(href))}
            >
              <Icon size={18} className="shrink-0" />
              <span className={collapsed ? "md:hidden" : ""}>{label}</span>
              <IoChevronForward
                size={14}
                className={`ml-auto text-text-disabled transition-transform duration-200 group-hover:translate-x-0.5 ${
                  collapsed ? "md:hidden" : ""
                }`}
              />
            </Link>
          ))}
        </nav>

        <div className="mx-5 mt-4 h-px bg-border" />

        <nav aria-label="Extra pages" className="flex flex-col gap-1 px-3 pt-4">
          <p
            className={`px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-text-disabled ${
              collapsed ? "md:hidden" : ""
            }`}
          >
            Extra pages
          </p>
          {extraPages.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              aria-current={isActive(href) ? "page" : undefined}
              className={itemClasses(isActive(href))}
            >
              <Icon size={18} className="shrink-0" />
              <span className={collapsed ? "md:hidden" : ""}>{label}</span>
              <IoChevronForward
                size={14}
                className={`ml-auto text-text-disabled transition-transform duration-200 group-hover:translate-x-0.5 ${
                  collapsed ? "md:hidden" : ""
                }`}
              />
            </Link>
          ))}
        </nav>

        <div className="mt-auto flex justify-center py-6">
          <button
            type="button"
            onClick={onToggleCollapse}
            aria-label={collapsed ? "Expandir sidebar" : "Contraer sidebar"}
            className="hidden size-10 items-center justify-center rounded-full bg-surface-hover text-text-muted transition-colors duration-200 hover:bg-border hover:text-text md:flex"
          >
            <IoArrowBackOutline
              size={18}
              className={`transition-transform duration-300 ${
                collapsed ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
      </aside>
    </>
  );
}
