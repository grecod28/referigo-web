import { Field } from "@/components/ui/inputs";
import { Button } from "@/components/ui/buttons";
import { IoSearch } from "react-icons/io5";

export default function SearchButton({ className }: { className?: string }) {
  return (
    <form className={className} action="/search" method="GET">
      <Field className="border border-r-0 border-surface rounded-l-md py-0! text-sm focus:outline-none" />
      <Button
        className="py-0! inline-block bg-brand-900 hover:bg-brand-800 rounded-r-md px-3!"
        type="submit"
      >
        <IoSearch size={16} />
      </Button>
    </form>
  );
}
