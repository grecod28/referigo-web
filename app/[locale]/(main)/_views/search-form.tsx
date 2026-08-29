"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/buttons";
import { Field } from "@/components/ui/inputs";
import { IoSearch } from "react-icons/io5";

type SearchType = "all" | "offers" | "coupons" | "stores" | "restaurants";

const searchTypes: SearchType[] = [
  "all",
  "offers",
  "coupons",
  "stores",
  "restaurants",
];

function actionForType(type: SearchType) {
  return type === "all" ? "/search" : `/${type}/search`;
}

export default function SearchForm() {
  const t = useTranslations("home");
  const tFilters = useTranslations("search");
  const [type, setType] = useState<SearchType>("all");

  return (
    <form
      action={actionForType(type)}
      method="GET"
      className="flex items-stretch gap-2"
    >
      <div className="flex w-32 shrink-0 sm:w-36">
        <Field
          as="select"
          aria-label={tFilters("filters.label")}
          value={type}
          onChange={(e) => setType(e.target.value as SearchType)}
          options={searchTypes.map((value) => ({
            value,
            label: tFilters(`filters.${value}`),
          }))}
          className="h-full min-h-0 w-full border border-surface rounded-md py-0! text-sm focus:outline-none"
        />
      </div>

      <Field
        placeholder={t("search.placeholder")}
        className="w-full border border-surface rounded-md py-0! text-sm focus:outline-none"
        name="q"
      />

      <Button className="rounded-md bg-brand-500" type="submit">
        <IoSearch />
      </Button>
    </form>
  );
}
