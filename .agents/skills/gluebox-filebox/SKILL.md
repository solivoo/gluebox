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
