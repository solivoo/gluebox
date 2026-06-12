export function buildLinkClass(
  ...modifiers: Array<string | false | undefined>
): string {
  const base = 'sidebar__link';
  const extras = modifiers.filter(Boolean).join(' ');
  return extras ? `${base} ${extras}` : base;
}
