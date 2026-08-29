"use client";

import SearchButton from "@/components/shared/search-button";
import { useState } from "react";
import { IoSearch } from "react-icons/io5";

export default function HeaderSearchBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section>
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          console.log(isOpen);
        }}
        className="lg:hidden"
      >
        <IoSearch />
      </button>

      <div
        className={`fixed ${!isOpen ? "-translate-y-52" : ""} md:inline-block transition-all duration-300 z-100`}
      >
        <SearchButton className="flex w-full max-w-110" />;
      </div>
    </section>
  );
}
