import type { ReactNode } from 'react';

/** Identificador de icono (string desde BD / API) */
export type IconName = string;

/** Función que renderiza un icono — la define la app consumidora */
export type IconResolver = (name: IconName, className?: string) => ReactNode;
