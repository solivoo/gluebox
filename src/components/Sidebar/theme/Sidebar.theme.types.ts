/** Tokens de color del Sidebar — una prop controla todo el aspecto visual */
export interface SidebarTheme {
  background: string;
  text: string;
  icon: string;
  hoverBackground: string;
  /** Fondo del ítem abierto o seleccionado */
  activeBackground: string;
  /** Texto del ítem seleccionado (se aplica con negrita) */
  activeText: string;
  /** Color de icono en ítem seleccionado (opcional) */
  activeIcon?: string;
  /** Texto de subítems inactivos */
  mutedText?: string;
  /** Fondo del fallback de icono cuando no hay renderIcon */
  iconFallbackBackground?: string;
}

export type SidebarThemePreset = 'dark' | 'light';

export type SidebarThemeInput = SidebarTheme | SidebarThemePreset;
