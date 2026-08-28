"use client";

import { useState } from "react";
import { IoNotifications, IoPerson } from "react-icons/io5";
import { Link } from "@/config/i18n/navigation";

export default function UserMenu() {
  const [isLogged, setIsLogged] = useState(false);

  return (
    <section className="flex gap-4 items-center">
      {isLogged && <IoNotifications size={20} />}

      <section
        className={`px-4 py-1 ${isLogged ? "lg:border-l" : ""} border-text-muted`}
      >
        <Link href={isLogged ? "/profile" : "/login"}>
          <IoPerson size={20} />
        </Link>
      </section>
    </section>
  );
}
