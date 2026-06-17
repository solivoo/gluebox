import type { ComponentType } from 'react';

/** Tipos de control disponibles para cada prop */
export type ControlKind = 'select' | 'boolean' | 'text' | 'number' | 'color' | 'slot';

/** Opción para controles tipo select */
export interface ControlOption {
  label: string;
  value: string;
}

/** Metadata de una prop */
export interface PropMeta {
  name: string;
  type: string;
  defaultValue: unknown;
  description: string;
  control: ControlKind;
  options?: ControlOption[];
  /** Props que dependen de esta (se ocultan si esta prop tiene cierto valor) */
  dependsOn?: { prop: string; value: unknown };
}

/** Metadata de un evento / callback */
export interface EventMeta {
  name: string;
  signature: string;
  description: string;
}

/** Sección de documentación de props (agrupadas por categoría) */
export interface PropSection {
  title: string;
  props: PropMeta[];
}

/** Metadata completa de un componente */
export interface ComponentMeta<P = Record<string, unknown>> {
  name: string;
  description: string;
  sourcePath: string;
  /** Props agrupadas por secciones */
  sections: PropSection[];
  /** Callbacks / eventos */
  events: EventMeta[];
  /** Si true, ocupa el ancho completo en el preview */
  fullWidthPreview?: boolean;
  /** Props iniciales con las que se monta el componente */
  defaults: P;
}

/** Props del <ComponentPlayground> */
export interface ComponentPlaygroundProps {
  meta: ComponentMeta;
  /** El componente real a renderizar */
  Component: ComponentType<Record<string, unknown>>;
}
