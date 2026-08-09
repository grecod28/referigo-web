export const getPathWithoutLocale = (path: string) => {
  const segments = path.split("/");
  if (segments.length > 1 && segments[1].length === 2) {
    return "/" + segments.slice(2).join("/");
  }
  return path;
};
