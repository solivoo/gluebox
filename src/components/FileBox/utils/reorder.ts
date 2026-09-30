/** Clave estable para identificar un File dentro de la lista. */
export function fileKey(file: File): string {
  return `${file.name}|${file.size}|${file.lastModified}`;
}

/** Mueve el elemento en `from` a la posición `to` (inclusive). Devuelve un array nuevo. */
export function moveFileItem(files: File[], from: number, to: number): File[] {
  if (from === to) return files;
  if (from < 0 || from >= files.length || to < 0 || to >= files.length) return files;
  const next = [...files];
  const [moved] = next.splice(from, 1);
  next.splice(to, 0, moved);
  return next;
}

/** Claves estables por posición: iguales a `fileKey` salvo duplicados reales. */
export function stableFileKeys(files: File[]): string[] {
  const seen = new Map<string, number>();
  return files.map((file) => {
    const key = fileKey(file);
    const count = (seen.get(key) ?? 0) + 1;
    seen.set(key, count);
    return count === 1 ? key : `${key}#${count}`;
  });
}
