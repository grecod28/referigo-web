import { Field, type InputProps } from "@/components/ui/inputs";
import { Button } from "@/components/ui/buttons";
import { IoSearch } from "react-icons/io5";

export type SearchParams = Record<
  string,
  string | number | boolean | null | undefined
>;

type SearchButtonProps = {
  action?: string;
  params?: SearchParams;
  inputProps?: InputProps;
  className?: string;
};

export default function SearchButton({
  action = "/search",
  params,
  inputProps,
  className,
}: SearchButtonProps) {
  return (
    <form className={className} action={action} method="GET">
      {params &&
        Object.entries(params).map(([name, value]) =>
          value == null ? null : (
            <input key={name} type="hidden" name={name} value={String(value)} />
          ),
        )}
      <Field
        className="border border-r-0 border-surface rounded-l-md py-0! text-sm focus:outline-none"
        name="q"
        {...inputProps}
      />
      <Button
        className="py-0! inline-block bg-brand-900 hover:bg-brand-800 rounded-r-md px-3!"
        type="submit"
      >
        <IoSearch size={16} />
      </Button>
    </form>
  );
}
