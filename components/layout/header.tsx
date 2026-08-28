import SearchButton from "@/components/shared/search-button";
import UserMenu from "./user-menu";

export function Header() {
  return (
    <header className="flex justify-between py-6 px-8 sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
      <SearchButton className="flex max-w-110 w-full" />

      <UserMenu />
    </header>
  );
}
