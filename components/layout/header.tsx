import { Field } from "@/components/ui/inputs";
import { Button } from "@/components/ui/buttons";
import { IoNotifications, IoPerson, IoSearch } from "react-icons/io5";

export function Header() {
  return (
    <header className="flex justify-between py-6 px-8 sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
      <form className="flex max-w-110 w-full" action="/search" method="GET">
        <Field className="border border-r-0 border-surface rounded-l-md py-0! text-sm focus:outline-none" />
        <Button
          className="py-0! inline-block bg-brand-900 hover:bg-brand-800 rounded-r-md px-3!"
          type="submit"
        >
          <IoSearch size={16} />
        </Button>
      </form>

      <section className="flex gap-4 items-center">
        <IoNotifications size={20} />
        <IoPerson size={20} />
      </section>
    </header>
  );
}
