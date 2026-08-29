import { IoMenu, IoNotifications, IoPerson } from "react-icons/io5";
import SearchButton from "@/components/shared/search-button";

type HeaderProps = {
  sidebarOpen?: boolean;
  onOpenSidebar?: () => void;
};

export function Header({
  sidebarOpen = false,
  onOpenSidebar = () => {},
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 flex items-center justify-between gap-4 border-b border-border bg-background/80 px-4 py-4 backdrop-blur-md md:px-8 md:py-6">
      <div className="flex w-full items-center gap-4">
        <button
          type="button"
          onClick={onOpenSidebar}
          aria-label="Abrir menú"
          aria-expanded={sidebarOpen}
          className="flex size-10 shrink-0 items-center justify-center rounded-lg text-text transition-colors duration-200 hover:bg-surface-hover md:hidden"
        >
          <IoMenu size={22} />
        </button>

        <SearchButton className="flex w-full max-w-110" />
      </div>

      <section className="flex shrink-0 items-center gap-4">
        <IoNotifications size={20} />

        <section className="px-4 py-1 lg:border-l border-text-muted">
          <IoPerson size={20} />
        </section>
      </section>
    </header>
  );
}
