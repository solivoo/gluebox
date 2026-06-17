export const MONTHS = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
];

export const DAYS_HEADER = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'];

/** Clave numérica YYYYMMDD para comparar fechas sin problemas de timezone */
export function dateKey(d: Date): number {
  return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
}

/** Parsea YYYY-MM-DD a Date local (medianoche local, sin UTC) */
export function parseDate(str: string): Date | null {
  if (!str || !/^\d{4}-\d{2}-\d{2}$/.test(str)) return null;
  const [y, m, day] = str.split('-').map(Number);
  if (!y || !m || !day) return null;
  const d = new Date(y, m - 1, day);
  return Number.isNaN(d.getTime()) ? null : d;
}

export function formatDisplay(str: string): string {
  const d = parseDate(str);
  if (!d) return '';
  return `${d.getDate()} ${MONTHS[d.getMonth()].slice(0, 3).toLowerCase()} ${d.getFullYear()}`;
}

export function toDateStr(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function isSameDay(a: Date, b: Date): boolean {
  return dateKey(a) === dateKey(b);
}

export function isDateInRange(date: Date, min?: string, max?: string): boolean {
  const key = dateKey(date);
  if (min) {
    const minDate = parseDate(min);
    if (minDate && key < dateKey(minDate)) return false;
  }
  if (max) {
    const maxDate = parseDate(max);
    if (maxDate && key > dateKey(maxDate)) return false;
  }
  return true;
}

export function todayAtMidnight(): Date {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

export interface NormalizedDateRange {
  from: Date;
  to: Date;
  fromKey: number;
  toKey: number;
}

/** Normaliza un par de fechas YYYY-MM-DD (intercambia si end < start) */
export function getNormalizedDateRange(
  start?: string,
  end?: string,
): NormalizedDateRange | null {
  const fromDate = parseDate(start ?? '');
  const toDate = parseDate(end ?? '');
  if (!fromDate || !toDate) return null;

  const fromKey = dateKey(fromDate);
  const toKey = dateKey(toDate);

  if (fromKey <= toKey) {
    return { from: fromDate, to: toDate, fromKey, toKey };
  }
  return { from: toDate, to: fromDate, fromKey: toKey, toKey: fromKey };
}

export type DayRangeRole = 'single' | 'start' | 'end' | 'middle';

/** Rol del día dentro del rango resaltado, o null si queda fuera */
export function getDayRangeRole(
  date: Date,
  range: NormalizedDateRange | null,
): DayRangeRole | null {
  if (!range) return null;

  const key = dateKey(date);
  if (key < range.fromKey || key > range.toKey) return null;
  if (range.fromKey === range.toKey) return 'single';
  if (key === range.fromKey) return 'start';
  if (key === range.toKey) return 'end';
  return 'middle';
}
