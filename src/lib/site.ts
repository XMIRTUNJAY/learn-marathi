// Base-aware URL helper (parity with engineering-notebook).
// import.meta.env.BASE_URL is '/' by default; if deployed under a
// sub-path, links keep working. Enforces trailing slashes on directory
// URLs so GitHub Pages serves them without a redirect hop — file
// URLs (with an extension) pass through untouched.
const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export function siteUrl(path: string = '/'): string {
  if (!path.startsWith('/')) {
    path = '/' + path;
  }
  const hash = path.indexOf('#');
  const query = path.indexOf('?');
  const cut = [hash, query].filter((i) => i >= 0);
  const end = cut.length ? Math.min(...cut) : path.length;
  const clean = path.slice(0, end);
  const suffix = path.slice(end);
  const full = `${base}${clean}`;
  const last = full.split('/').pop() ?? '';
  if (!last.includes('.') && !full.endsWith('/')) return full + '/' + suffix;
  return full + suffix;
}
