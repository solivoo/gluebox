# Esquema del menú (API)

Contrato JSON que debe entregar tu backend (o CMS) para alimentar el **Sidebar** de gluBox. La misma estructura sirve como fuente de verdad para generar rutas en el frontend.

## Estructura raíz

```json
{
  "items": [ /* MenuItem[] */ ]
}
```

Tipo TypeScript: `MenuConfig`.

## MenuItem (nivel 1 — módulo)

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `id` | `string` | Sí | Identificador único estable (UUID o slug). |
| `label` | `string` | Sí | Texto visible en el sidebar. |
| `icon` | `string` | No | Nombre del icono para `renderIcon` (ej. `"receipt"`). |
| `path` | `string` | No | Ruta de navegación. En módulos con hijos: página de inicio del módulo. |
| `permissions` | `string[]` | No | Permisos requeridos (OR). Sin campo = visible para todos. |
| `position` | `"top" \| "bottom"` | No | `"top"` por defecto. `"bottom"` para Ajustes, Ayuda, etc. |
| `children` | `MenuSubItem[]` | No | Opciones y acciones anidadas. |

## MenuSubItem (nivel 2 y 3)

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `id` | `string` | Sí | Identificador único. |
| `label` | `string` | Sí | Texto visible. |
| `path` | `string` | Condicional | **Obligatorio en hojas (acciones).** Opcional en agrupadores. |
| `permissions` | `string[]` | No | Misma regla OR que en módulos. |
| `children` | `MenuSubItem[]` | No | Anidación recursiva (hasta 3 niveles en la práctica). |

## Convenciones de `path`

- Usar rutas absolutas: `/facturacion/facturas/emitir`.
- Deben coincidir con las rutas de tu router.
- Un mismo `path` no debe repetirse en el menú.
- Recomendado: prefijo por módulo (`/facturacion/...`, `/bodegas/...`).

## Convenciones de `permissions`

- Formato sugerido: `modulo:recurso:accion` (ej. `facturacion:facturas:emitir`).
- El permiso de lectura del módulo suele ser `modulo:read`.
- Los permisos los emite tu sistema de identidad; gluBox solo compara strings.

Ejemplo alineado al menú demo:

```json
{
  "permissions": [
    "facturacion:read",
    "facturacion:facturas:read",
    "facturacion:facturas:emitir",
    "facturacion:facturas:consultar"
  ]
}
```

## Reglas de visibilidad (RBAC)

El Sidebar aplica internamente:

1. **Hoja** — visible si `hasPermission(user, item.permissions)`.
2. **Rama** — visible si al menos un descendiente es visible.
3. **Sin `permissions`** — siempre visible.

Lógica OR:

```ts
// Pseudocódigo
visible = !permissions?.length || permissions.some(p => userPermissions.includes(p));
```

## Ejemplo completo (referencia)

Menú demo del repositorio (`src/components/Sidebar/data/mockMenu.json`):

```json
{
  "items": [
    {
      "id": "facturacion",
      "label": "Facturación",
      "icon": "receipt",
      "path": "/facturacion",
      "permissions": ["facturacion:read"],
      "position": "top",
      "children": [
        {
          "id": "facturacion-facturas",
          "label": "Facturas",
          "permissions": ["facturacion:facturas:read"],
          "children": [
            {
              "id": "facturacion-facturas-emitir",
              "label": "Emitir",
              "path": "/facturacion/facturas/emitir",
              "permissions": ["facturacion:facturas:emitir"]
            },
            {
              "id": "facturacion-facturas-consultar",
              "label": "Consultar",
              "path": "/facturacion/facturas/consultar",
              "permissions": ["facturacion:facturas:consultar"]
            }
          ]
        },
        {
          "id": "facturacion-documentos",
          "label": "Documentos",
          "permissions": ["facturacion:documentos:read"],
          "children": [
            {
              "id": "facturacion-documentos-emitidos",
              "label": "Emitidos",
              "path": "/facturacion/documentos/emitidos",
              "permissions": ["facturacion:documentos:emitidos"]
            }
          ]
        }
      ]
    },
    {
      "id": "contabilidad",
      "label": "Contabilidad",
      "icon": "book-open",
      "path": "/contabilidad",
      "permissions": ["contabilidad:read"],
      "position": "top",
      "children": [
        {
          "id": "contabilidad-plan-cuentas",
          "label": "Plan de cuentas",
          "path": "/contabilidad/plan-cuentas",
          "permissions": ["contabilidad:plan-cuentas:read"]
        }
      ]
    },
    {
      "id": "ajustes",
      "label": "Ajustes",
      "icon": "settings",
      "path": "/ajustes",
      "permissions": ["ajustes:read"],
      "position": "bottom"
    }
  ]
}
```

## Respuesta API sugerida

```http
GET /api/navigation/menu
Authorization: Bearer <token>
```

```json
{
  "items": [ "..."]
}
```

Opcionalmente el mismo endpoint o `/api/auth/me` puede devolver `permissions: string[]` para el usuario.

## Validación recomendada (backend)

- [ ] Cada `id` es único en el árbol.
- [ ] Toda hoja navegable tiene `path` y `permissions` acorde al rol.
- [ ] Los agrupadores sin `path` tienen al menos un hijo.
- [ ] Los `path` no tienen trailing slash inconsistente.
- [ ] Iconos referenciados existen en el registro del frontend.

## Integración frontend

```tsx
// Carga típica
const [menu, setMenu] = useState<MenuConfig>({ items: [] });
const [permissions, setPermissions] = useState<Permission[]>([]);

useEffect(() => {
  Promise.all([
    fetch('/api/navigation/menu').then(r => r.json()),
    fetch('/api/auth/permissions').then(r => r.json()),
  ]).then(([menuData, { permissions: perms }]) => {
    setMenu(menuData);
    setPermissions(perms);
  });
}, []);

return (
  <Sidebar
    menu={menu}
    userPermissions={permissions}
    activePath={pathname}
    onNavigate={navigate}
    renderIcon={renderMenuIcon}
  />
);
```

Siguiente paso: [Integración con routing](/guide/routing).
