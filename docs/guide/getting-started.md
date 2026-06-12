# Introducción

gluBox es una librería de componentes React para dashboards y aplicaciones internas (ERP, facturación, inventario, etc.).

## Qué incluye hoy

- **[Sidebar](/components/sidebar)** — Navegación lateral con menú dinámico desde API, RBAC, 3 niveles, temas, modo colapsado e iconos personalizables.

## Documentación

| Guía | Contenido |
|------|-----------|
| [Instalación](/guide/installation) | npm, CSS, iconos, TypeScript |
| [Esquema del menú (API)](/guide/menu-api) | Contrato JSON para backend |
| [Integración con routing](/guide/routing) | React Router, guards, registro de rutas |
| [Sidebar (referencia)](/components/sidebar) | Props, temas, RBAC, checklist |
| [Storybook](/storybook/) | Playground interactivo |

## Requisitos

- React 18+
- TypeScript recomendado

## Demo local

```bash
git clone https://github.com/solivoo/gluebox.git
cd gluebox
pnpm install
pnpm dev          # App demo con routing (src/demo/)
pnpm storybook    # Playground del Sidebar
pnpm docs:dev     # Sitio de documentación
```

## Flujo típico de integración

1. Instalar `glubox` e importar estilos.
2. Consumir `MenuConfig` desde tu API ([esquema](/guide/menu-api)).
3. Pasar permisos del usuario y `renderIcon`.
4. Conectar `activePath` / `onNavigate` al router ([guía](/guide/routing)).
5. Validar permisos también en rutas (403) y en el backend.

## Próximos componentes

La librería crecerá con más bloques reutilizables (Header, DataTable, etc.).
