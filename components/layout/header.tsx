import { IoNotifications, IoPerson } from "react-icons/io5";
import SearchButton from "@/components/shared/search-button";

export function Header() {
  return (
    <header className="flex justify-between py-6 px-8 sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
      <SearchButton className="flex max-w-110 w-full" />

      <section className="flex gap-4 items-center">
        <IoNotifications size={20} />

        <section className="px-4 py-1 lg:border-l border-text-muted">
          <IoPerson size={20} />
        </section>
      </section>
    </header>
  );
}
