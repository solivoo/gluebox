/** Tokens de color del Sidebar — una prop controla todo el aspecto visual */
export interface SidebarTheme {
  background: string;
  text: string;
  icon: string;
  hoverBackground: string;
  /** @deprecated Usar hoverBackground; ya no se aplica fondo en ítems abiertos */
  activeBackground: string;
  activeText: string;
  activeIcon?: string;
  mutedText?: string;
  iconFallbackBackground?: string;
  /** Línea guía del árbol (opciones / acciones) */
  treeLine?: string;
  /** Barra lateral de módulo con descendiente activo o acción seleccionada */
  railActive?: string;
}

export type SidebarThemePreset = 'dark' | 'light';

export type SidebarThemeInput = SidebarTheme | SidebarThemePreset;
