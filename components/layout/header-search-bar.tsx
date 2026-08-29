"use client";

import { useEffect, useState } from "react";
import SearchButton from "@/components/shared/search-button";
import { IoSearch } from "react-icons/io5";

export default function HeaderSearchBar() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Abrir buscador"
        aria-expanded={isOpen}
        className="flex size-10 shrink-0 items-center justify-center rounded-lg text-text transition-colors duration-200 hover:bg-surface-hover md:hidden"
      >
        <IoSearch size={20} />
      </button>

      <SearchButton className="hidden w-full max-w-110 md:flex" />

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Buscador"
          onClick={() => setIsOpen(false)}
          className="fixed h-screen inset-0 z-50 flex items-start justify-center bg-black/40 px-4 pt-6 animate-[searchbar-in_0.25s_ease-out] md:hidden"
        >
          <div className="w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
            <SearchButton
              className="flex w-full"
              inputProps={{ autoFocus: true }}
            />
          </div>
        </div>
      )}
    </>
  );
}
