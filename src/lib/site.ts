// Base-aware URL helper (parity with engineering-notebook).
// import.meta.env.BASE_URL is '/' by default; if deployed under a
// sub-path, links keep working.
const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export function siteUrl(path: string = '/'): string {
  if (!path.startsWith('/')) {
    path = '/' + path;
  }
  return `${base}${path}`;
}
