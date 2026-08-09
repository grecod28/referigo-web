"use client";

import { usePathname } from "next/navigation";
import { Link } from "@/config/i18n/navigation";
import { getPathWithoutLocale } from "@/lib/utils";
import { Route } from "@/types/navigation";

export default function Navbar({ routes }: { routes: Route[] }) {
  const pathName = usePathname();

  const cleanPathName = getPathWithoutLocale(pathName);

  return (
    <nav>
      {routes.map(({ href, label }) => (
        <Link
          className={`${cleanPathName.startsWith(href) ? "text-primary" : ""}`}
          href={href}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}
