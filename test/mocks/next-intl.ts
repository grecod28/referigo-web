import {
  createContext,
  createElement,
  useContext,
  type ReactNode,
} from "react";

type Messages = Record<string, unknown>;

const IntlContext = createContext<Messages | null>(null);

function resolve(messages: Messages, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, part) => {
    if (acc && typeof acc === "object") {
      return (acc as Messages)[part];
    }
    return undefined;
  }, messages);
}

export function NextIntlClientProvider({
  messages,
  children,
}: {
  locale?: string;
  messages?: Messages;
  children: ReactNode;
}) {
  return createElement(
    IntlContext.Provider,
    { value: messages ?? null },
    children,
  );
}

export function useTranslations(namespace?: string) {
  const messages = useContext(IntlContext);

  return (key: string) => {
    if (!messages) return key;

    const namespaceMessages = namespace
      ? (messages[namespace] as Messages | undefined)
      : messages;
    const value = namespaceMessages
      ? resolve(namespaceMessages, key)
      : undefined;

    return typeof value === "string" ? value : key;
  };
}
