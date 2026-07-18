/** Longitud segura del valor de un input controlado o no controlado. */
export function inputValueLength(
  value: string | number | readonly string[] | undefined,
): number {
  if (value == null) return 0;
  if (typeof value === 'number') return String(value).length;
  if (typeof value === 'string') return value.length;
  return value.join('').length;
}
