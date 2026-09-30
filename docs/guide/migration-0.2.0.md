# Guía de Migración a gluBox 0.2.0

gluBox `0.2.0` es una versión mayor que simplifica radicalmente el sistema de diseño, adoptando **Material Design (MUI)** bajo la familia temática **`commerce`** como estándar único oficial, eliminando las familias legacy (`default`, `modern`, `enterprise`), e introduciendo el nuevo componente **`Switch`** y suites estrictas de calidad y regresión visual en CI.

---

## Resumen de Cambios Breaking

| Característica | En gluBox 0.1.x | En gluBox 0.2.0 |
| :--- | :--- | :--- |
| **Familias de tema** | `default`, `modern`, `enterprise`, `commerce` | **Únicamente `commerce` (Material Design / MUI)** |
| **Presets en componentes (`theme` prop)** | `'light'`, `'dark'`, `'modern-light'`, `'enterprise-dark'`, etc. | **`'commerce-light'` o `'commerce-dark'`** |
| **Atributo `data-theme` en DOM** | `"default" \| "modern" \| "enterprise" \| "commerce"` | **`"commerce"`** |
| **Archivos CSS exportados** | `dist/themes/default.css`, `modern.css`, `enterprise.css` | **`dist/themes/commerce.css` e `index.css`** |

---

## Pasos para Migrar

### 1. Actualizar las importaciones de hojas de estilo (CSS)

Si importabas temas individuales legacy, reemplázalos por `commerce.css` o `index.css`:

```diff
- import 'glubox/themes/default.css';
- import 'glubox/themes/modern.css';
- import 'glubox/themes/enterprise.css';
+ import 'glubox/themes/commerce.css';
```

O si utilizas el bundle completo de temas:

```typescript
import 'glubox/dist/glubox.css';
import 'glubox/themes/index.css';
```

### 2. Configurar el tema en el elemento raíz del DOM

Actualiza `data-theme` en tu etiqueta `<html>` o contenedor raíz para usar `"commerce"`. El modo se especifica mediante `data-mode`:

```html
<!-- Modo claro -->
<html data-theme="commerce" data-mode="light">

<!-- Modo oscuro -->
<html data-theme="commerce" data-mode="dark">
```

En TypeScript / React:

```typescript
document.documentElement.setAttribute('data-theme', 'commerce');
document.documentElement.setAttribute('data-mode', isDarkMode ? 'dark' : 'light');
```

### 3. Actualizar la propiedad `theme` en los componentes

Si pasabas la prop `theme` con presets heredados a componentes como `Button`, `TextBox`, `Select`, `DataGrid`, etc.:

```diff
- <Button theme="light">Guardar</Button>
- <Button theme="enterprise-dark">Guardar</Button>
+ <Button theme="commerce-light">Guardar</Button>
+ <Button theme="commerce-dark">Guardar</Button>
```

> **Nota:** La mayoría de los proyectos no necesitan pasar `theme` directamente a cada componente; al omitirlo, el componente hereda automáticamente los tokens definidos por `[data-theme="commerce"]` en el DOM.

---

## Novedades en 0.2.0

### Nuevo Componente: `Switch`

Se incorpora el componente `<Switch />` para selecciones binarias con deslizador suave estilo Material:

```tsx
import { useState } from 'react';
import { Switch } from 'glubox';

export function SettingsPage() {
  const [notifications, setNotifications] = useState(true);

  return (
    <Switch
      checked={notifications}
      onChange={setNotifications}
      label="Notificaciones por correo"
      labelPosition="right"
      helperText="Recibirás resúmenes semanales"
    />
  );
}
```

### Tipografía Roboto y Elevación Material

La familia `commerce` utiliza la fuente estándar **Roboto** con bordes de `4px` y elevaciones táctiles para botones primarios y contenedores (`--glb-overlay-shadow`). Si no tienes la fuente cargada en tu aplicación web, puedes incluirla en tu HTML:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" />
```
