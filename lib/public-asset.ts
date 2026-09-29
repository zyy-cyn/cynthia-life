/** Include the GitHub Pages project path without changing local or custom-domain builds. */
export function publicAsset(path: string) {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
}
