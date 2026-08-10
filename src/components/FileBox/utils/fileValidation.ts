import type { FileRejection } from '../type/FileBox.types';

/** Comprueba si un File cumple el atributo `accept` (mime o extensión). */
export function matchesAccept(file: File, accept?: string): boolean {
  if (!accept || accept.trim() === '' || accept === '*') return true;

  const tokens = accept.split(',').map((t) => t.trim().toLowerCase()).filter(Boolean);
  const name = file.name.toLowerCase();
  const type = file.type.toLowerCase();

  return tokens.some((token) => {
    if (token.startsWith('.')) return name.endsWith(token);
    if (token.endsWith('/*')) {
      const group = token.slice(0, -1); // "image/"
      return type.startsWith(group);
    }
    return type === token;
  });
}

export function filterIncomingFiles(options: {
  incoming: File[];
  current: File[];
  accept?: string;
  maxSize?: number;
  maxFiles?: number;
  multiple: boolean;
}): { accepted: File[]; rejected: FileRejection[] } {
  const { incoming, current, accept, maxSize, maxFiles, multiple } = options;
  const rejected: FileRejection[] = [];
  const accepted: File[] = [];

  const capacity = multiple
    ? maxFiles !== undefined
      ? Math.max(0, maxFiles - current.length)
      : Infinity
    : current.length > 0
      ? 0
      : 1;

  let remaining = capacity;

  for (const file of incoming) {
    if (!matchesAccept(file, accept)) {
      rejected.push({ file, reason: 'type' });
      continue;
    }
    if (maxSize !== undefined && file.size > maxSize) {
      rejected.push({ file, reason: 'size' });
      continue;
    }
    if (remaining <= 0) {
      rejected.push({ file, reason: 'max-files' });
      continue;
    }
    accepted.push(file);
    remaining -= 1;
  }

  return { accepted, rejected };
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function summarizeFiles(files: File[]): string {
  if (files.length === 0) return '';
  if (files.length === 1) return files[0].name;
  return `${files.length} archivos`;
}
