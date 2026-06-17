# Introducción

gluBox es una librería de componentes React para dashboards y aplicaciones internas (ERP, facturación, inventario, etc.).

## Qué incluye hoy

### Navegación

- **[Sidebar](/components/sidebar)** — Menú dinámico desde API, RBAC, 3 niveles, temas, modo colapsado e iconos personalizables.

### Formularios

- **[TextBox, Select, DateBox, RangeDateBox](/components/forms)** — Campos con variantes visuales, estados de error, label outlined (sobre el borde) y temas.

### Botones y selección

- **[Button, CheckButton, OptionGroup](/components/buttons)** — Acciones, toggles y grupos de opción exclusiva.

## Documentación

| Guía | Contenido |
|------|-----------|
| [Instalación](/guide/installation) | npm, CSS, temas, TypeScript |
| [Esquema del menú (API)](/guide/menu-api) | Contrato JSON para backend |
| [Integración con routing](/guide/routing) | React Router, guards, registro de rutas |
| [Formularios](/components/forms) | TextBox, Select, fechas, label outlined |
| [Botones](/components/buttons) | Button, CheckButton, OptionGroup |
| [Sidebar (referencia)](/components/sidebar) | Props, temas, RBAC |

## Requisitos

- React 18+
- TypeScript recomendado

## Demo local

```bash
git clone https://github.com/solivoo/gluebox.git
cd gluebox
pnpm install
pnpm dev          # Playground interactivo en /componentes/*
pnpm docs:dev     # Esta documentación
```

## Flujo típico de integración

1. Instalar `glubox` e importar `glubox/style.css` y un tema (`glubox/themes/default.css`).
2. Configurar `data-theme` y `data-mode` en `<html>`.
3. Consumir `MenuConfig` desde tu API ([esquema](/guide/menu-api)).
4. Conectar Sidebar con `activePath` / `onNavigate` ([routing](/guide/routing)).
5. Usar controles de formulario con el mismo sistema de temas.
6. Validar permisos en rutas (403) y en el backend.
