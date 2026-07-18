import type { ComponentType, ReactNode } from 'react';

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
  /** Solo documentación API; no aparece en el panel del playground */
  hideInPlayground?: boolean;
  /** Solo control del playground; no aparece en /api/props */
  hideInDocs?: boolean;
}

/** Metadata de un evento / callback */
export interface EventMeta {
  name: string;
  signature: string;
  description: string;
  /** Tipo TypeScript exportado desde `glubox` para tipar el handler. */
  handlerType?: string;
  /** Tipo del valor emitido (payload), si aplica. */
  payloadType?: string;
}

/** Sección de documentación de props (agrupadas por categoría) */
export interface PropSection {
  title: string;
  props: PropMeta[];
}

/** Metadata completa de un componente */
export interface ComponentMeta<P extends object = Record<string, unknown>> {
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
export interface ComponentPlaygroundProps<P extends object = Record<string, unknown>> {
  meta: ComponentMeta<P>;
  /** El componente real a renderizar en el preview */
  Component?: ComponentType<P>;
  /**
   * Preview personalizado (modales, toasts, etc.).
   * Si se define, tiene prioridad sobre `Component`.
   */
  renderPreview?: (props: P) => ReactNode;
  /**
   * Envuelve el playground completo (ej. ToastProvider).
   * Recibe el layout y las props limpias del panel.
   */
  wrapper?: (children: ReactNode, props: P) => ReactNode;
}
