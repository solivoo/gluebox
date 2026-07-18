/**
 * Utilidades para tipar handlers de eventos de componentes gluBox.
 * Usar con los tipos `*On*Handler` exportados por cada componente.
 */

/** Handler requerido definido en las props de un componente. */
export type RequiredEventHandler<
  Props extends object,
  Key extends keyof Props,
> = Props[Key];

/** Handler opcional definido en las props de un componente. */
export type OptionalEventHandler<
  Props extends object,
  Key extends keyof Props,
> = NonNullable<Props[Key]>;

/** Primer argumento de un handler opcional (valor del evento / payload). */
export type EventHandlerPayload<
  Props extends object,
  Key extends keyof Props,
> = NonNullable<Props[Key]> extends (...args: never[]) => unknown
  ? Parameters<Extract<NonNullable<Props[Key]>, (...args: never[]) => unknown>>[0]
  : never;
