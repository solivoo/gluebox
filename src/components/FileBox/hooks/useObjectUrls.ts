import { useEffect, useRef, useState } from 'react';
import { fileKey } from '../utils/reorder';

function supportsObjectUrls(): boolean {
  return typeof URL !== 'undefined' && typeof URL.createObjectURL === 'function';
}

/**
 * Mantiene un mapa estable File → objectURL.
 * Solo crea URLs para archivos nuevos y las revoca al quitarse, evitando
 * recrearlas (y parpadeos de imagen) cuando cambia el orden de la lista.
 */
export function useObjectUrls(files: File[]): string[] {
  const [urlMap, setUrlMap] = useState<Map<string, string>>(() => new Map());
  const urlMapRef = useRef(urlMap);

  useEffect(() => {
    if (!supportsObjectUrls()) return;

    const prev = urlMapRef.current;
    const next = new Map(prev);
    let changed = false;

    for (const file of files) {
      const key = fileKey(file);
      if (!next.has(key)) {
        next.set(key, URL.createObjectURL(file));
        changed = true;
      }
    }

    const currentKeys = new Set(files.map(fileKey));
    for (const [key, url] of prev) {
      if (!currentKeys.has(key)) {
        URL.revokeObjectURL(url);
        next.delete(key);
        changed = true;
      }
    }

    if (changed) {
      urlMapRef.current = next;
      setUrlMap(next);
    }
  }, [files]);

  useEffect(() => {
    return () => {
      if (!supportsObjectUrls()) return;
      for (const url of urlMapRef.current.values()) {
        URL.revokeObjectURL(url);
      }
    };
  }, []);

  if (!supportsObjectUrls()) return files.map(() => '');

  return files.map((file) => urlMap.get(fileKey(file)) ?? '');
}
