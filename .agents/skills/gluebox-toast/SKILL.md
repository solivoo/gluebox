---
name: gluebox-toast
description: >-
  Use this skill when implementing notification toasts, toast queues, and floating feedback messages with ToastProvider and useToast in Gluebox.
---

# Gluebox Toast

El sistema `Toast` proporciona notificaciones flotantes con soporte para distintos tipos de feedback (`info`, `success`, `warning`, `error`), temporizador visual, animaciones fluidas y posiciones configurables.

## Importación

```tsx
import { ToastProvider, useToast, toastThemes } from 'glubox';
import type { ShowToastOptions } from 'glubox';
```

## Configuración con Provider

Envuelve la aplicación o la sección raíz con `ToastProvider`:

```tsx
import { ToastProvider } from 'glubox';

export function App() {
  return (
    <ToastProvider position="bottom-right" maxToasts={5}>
      <MiAplicacion />
    </ToastProvider>
  );
}
```

## Uso con el Hook `useToast`

```tsx
import { useToast } from 'glubox';

export function GuardarFormulario() {
  const { showToast, dismissToast } = useToast();

  const handleSave = async () => {
    try {
      await api.save();
      showToast({
        title: 'Operación exitosa',
        description: 'El registro se guardó correctamente.',
        variant: 'success',
        duration: 4000,
      });
    } catch (err) {
      showToast({
        title: 'Error al guardar',
        description: 'No se pudo completar la solicitud.',
        variant: 'error',
      });
    }
  };

  return <button onClick={handleSave}>Guardar</button>;
}
```
