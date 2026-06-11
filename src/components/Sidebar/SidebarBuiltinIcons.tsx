import type { ReactElement, SVGProps } from 'react';

type BuiltinIconProps = SVGProps<SVGSVGElement>;

function ChevronDownIcon(props: BuiltinIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" {...props}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function PanelLeftCloseIcon(props: BuiltinIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M9 3v18" />
      <path d="m14 9-3 3 3 3" />
    </svg>
  );
}

function PanelLeftOpenIcon(props: BuiltinIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M9 3v18" />
      <path d="m13 9 3 3-3 3" />
    </svg>
  );
}

/** Iconos de UI del sidebar (chevron, contraer). No dependen de Lucide en la app consumidora. */
export const sidebarBuiltinIcons: Record<string, (props: BuiltinIconProps) => ReactElement> = {
  'chevron-down': ChevronDownIcon,
  'panel-left-close': PanelLeftCloseIcon,
  'panel-left-open': PanelLeftOpenIcon,
};

export const sidebarBuiltinIconNames = Object.keys(sidebarBuiltinIcons);
