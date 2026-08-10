import { describe, expect, it } from 'vitest';
import {
  filterIncomingFiles,
  formatFileSize,
  matchesAccept,
  summarizeFiles,
} from './fileValidation';

function fakeFile(name: string, size = 10, type = 'text/plain'): File {
  return new File([new Uint8Array(size)], name, { type });
}

describe('matchesAccept', () => {
  it('acepta extensión y mime wildcard', () => {
    expect(matchesAccept(fakeFile('a.pdf', 1, 'application/pdf'), '.pdf')).toBe(true);
    expect(matchesAccept(fakeFile('a.png', 1, 'image/png'), 'image/*')).toBe(true);
    expect(matchesAccept(fakeFile('a.txt', 1, 'text/plain'), 'image/*')).toBe(false);
  });
});

describe('filterIncomingFiles', () => {
  it('filtra por tamaño y capacidad', () => {
    const { accepted, rejected } = filterIncomingFiles({
      incoming: [
        fakeFile('ok.txt', 10),
        fakeFile('big.txt', 1000),
        fakeFile('extra.txt', 10),
      ],
      current: [],
      maxSize: 100,
      maxFiles: 1,
      multiple: true,
    });
    expect(accepted.map((f) => f.name)).toEqual(['ok.txt']);
    expect(rejected.map((r) => r.reason)).toEqual(['size', 'max-files']);
  });

  it('en modo single reemplaza y no acumula', () => {
    const current = [fakeFile('prev.txt')];
    const { accepted } = filterIncomingFiles({
      incoming: [fakeFile('next.txt')],
      current: [],
      multiple: false,
    });
    expect(accepted).toHaveLength(1);
    expect(current).toHaveLength(1);
  });
});

describe('formatters', () => {
  it('formatea tamaño y resumen', () => {
    expect(formatFileSize(500)).toBe('500 B');
    expect(formatFileSize(2048)).toBe('2.0 KB');
    expect(summarizeFiles([])).toBe('');
    expect(summarizeFiles([fakeFile('a.txt')])).toBe('a.txt');
    expect(summarizeFiles([fakeFile('a.txt'), fakeFile('b.txt')])).toBe('2 archivos');
  });
});
