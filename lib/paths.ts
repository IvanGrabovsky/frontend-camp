export function getBasePath(): string {
  return process.env.NEXT_PUBLIC_BASE_PATH || '';
}

export function withBasePath(path: string): string {
  const base = getBasePath();
  if (!path.startsWith('/')) {
    return `${base}/${path}`.replace(/\/+/g, '/');
  }
  return `${base}${path}` || '/';
}
