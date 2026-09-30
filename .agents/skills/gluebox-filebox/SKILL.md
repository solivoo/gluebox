---
name: gluebox-filebox
description: >-
  Use this skill when implementing file uploading, drag and drop dropzones, and file validation using FileBox or FileUploader in Gluebox.
---

# Gluebox FileBox / FileUploader

El componente `FileBox` (también disponible como `FileUploader`) permite la selección y carga de archivos tanto en formato campo compacto (`field`) como en zona de arrastrar y soltar (`dropzone`), con validación de tipo de archivo, peso máximo y cantidad.

## Importación

```tsx
import { FileBox, FileUploader } from 'glubox';
import type { FileBoxProps, FileUploaderProps, FileRejection } from 'glubox';
```

## Props Principales

| Prop | Tipo | Por Defecto | Descripción |
|------|------|-------------|-------------|
| `displayMode` | `'field' \| 'dropzone'` | `'field'` | Modo compacto o área de dropzone |
| `multiple` | `boolean` | `false` | Permite seleccionar múltiples archivos |
| `reorderable` | `boolean` | `false` | Tira horizontal de miniaturas con tile "+", reordenado por arrastre (mouse/touch) y teclado. Implica `multiple` |
| `accept` | `string` | `undefined` | Extensiones o MIME admitidos (ej: `"image/*,.pdf"`) |
| `maxSize` | `number` | `undefined` | Tamaño máximo por archivo en bytes |
| `maxFiles` | `number` | `undefined` | Cantidad máxima de archivos admitidos |
| `showClearButton` | `boolean` | `true` | Muestra botón de limpiar en modo field |
| `value` / `defaultValue` | `File[]` | `undefined` | Archivos seleccionados (controlado/no controlado) |
| `onChange` | `(files: File[]) => void` | `undefined` | Emite la lista de archivos aceptados |
| `onReject` | `(rejections: FileRejection[]) => void` | `undefined` | Emite archivos rechazados y el motivo (`type`, `size`, `max-files`) |
| `disabled` | `boolean` | `false` | Deshabilita selección y drop |
| `label` | `string` | `undefined` | Texto de etiqueta o título de dropzone |

## Ejemplos de Uso

### Modo Dropzone con Validación
```tsx
<FileBox
  displayMode="dropzone"
  multiple
  accept="image/*,.pdf"
  maxSize={5 * 1024 * 1024} // 5 MB
  maxFiles={3}
  onChange={(files) => console.log('Archivos subidos:', files)}
  onReject={(rejected) => {
    rejected.forEach(({ file, reason }) => {
      console.warn(`Archivo ${file.name} rechazado por: ${reason}`);
    });
  }}
/>
```

### Modo Campo Compacto (Field)
```tsx
<FileUploader
  label="Foto de perfil"
  accept="image/png,image/jpeg"
  showClearButton
  onChange={(files) => setAvatar(files[0] ?? null)}
/>
```

## Características Técnicas de Drag & Drop
- **Contador de profundidad (`dragDepthRef`)**: Evita que los eventos `dragleave` sobre elementos hijos apaguen el estado visual de arrastre (`glb-filebox--dragging`).
- **Dropzone no nativa de `<button>`**: Implementada como `<div role="button">` para prevenir que soltar un archivo dispare un falso evento sintético de `click`.
- **Sincronización `DataTransfer`**: Los archivos soltados se sincronizan con el `<input type="file">` nativo para compatibilidad con formularios HTML nativos y `FormData`.

## Reordenamiento (`reorderable`)
```tsx
<FileBox
  label="Galería"
  reorderable
  accept="image/*"
  maxFiles={6}
  onChange={(files) => setFotos(files)}
/>
```
- **UI**: tira horizontal de miniaturas cuadradas (preview vía objectURL; extensión como fallback) + tile "+" final que abre el picker y se desplaza al final de la tira (desaparece al llegar a `maxFiles`, que además muestra un contador `N/maxFiles` debajo). Con `reorderable` se **ocultan el campo de resumen y el botón "Elegir archivo"**; la tira es la interfaz.
- **Drag**: sesión con **listeners a nivel `document`** (`pointermove`/`pointerup`/`pointercancel`) en lugar de `setPointerCapture`: React mueve el nodo capturado al reordenar y el navegador libera la captura (cancelaba el drag hacia la derecha). Umbral de activación de 4px y reordenado "live" derivado (`displayFiles = moveFileItem(files, from, to)`); `touch-action: none` en cada tile para touch. El commit se emite **una sola vez** al soltar (`moveAt` → `onChange`) y `Escape`/`pointercancel` cancelan.
- **Destino**: `computeTargetIndex` **excluye el tile arrastrado** (su midpoint sería un blanco móvil): cuenta los otros tiles cuyo centro quedó a la izquierda del puntero (fila) o en filas superiores (wrap). Comportamiento simétrico izquierda↔derecha.
- **Fantasma flotante**: al activarse el drag se renderiza un clon del tile vía `createPortal` a `document.body` con `position: fixed` y `pointer-events: none`, que sigue al puntero (`translate3d`); el tile de origen queda como placeholder punteado (`--source`). Métricas de agarre en estado (`ghostMetrics`), no en ref.
- **Teclado**: tiles focusables (`tabIndex=0`), `←`/`→` mueven (`moveAt(index, index±1)`).
- **Miniaturas**: `useObjectUrls` mantiene un mapa File→objectURL estable (crea solo URLs nuevas, revoca las removidas) para evitar parpadeos al reordenar; claves de React estables por contenido (`stableFileKeys`) para que el nodo capturado siga al archivo durante el drag.
- Los drops desde el SO sobre la tira agregan archivos (la zona resalta).
- El orden del array emitido es el visual: la primera miniatura de la izquierda es `files[0]`.
