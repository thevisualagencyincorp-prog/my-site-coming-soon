export function assetPath(path: string) {
  const brand = process.env.NEXT_PUBLIC_BRAND_BASE || "/brand";
  if (path.startsWith("/images/icons/")) {
    const file = path.split("/").pop();
    return `${brand}/icons/${file}`;
  }
  return path;
}

