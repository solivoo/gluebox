import type { MenuConfig, MenuItem, MenuSubItem, Permission } from '@/components/Sidebar/type/menu.types';

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

export interface MenuRoute {
  path: string;
  label: string;
  permissions?: Permission[];
  breadcrumbs: BreadcrumbItem[];
}

type MenuNode = MenuItem | MenuSubItem;

function walkNodes(
  nodes: MenuNode[],
  ancestors: BreadcrumbItem[],
  registry: Map<string, MenuRoute>,
): void {
  for (const node of nodes) {
    const currentCrumb: BreadcrumbItem = { label: node.label, path: node.path };
    const breadcrumbs = [...ancestors, currentCrumb];

    if (node.path) {
      registry.set(node.path, {
        path: node.path,
        label: node.label,
        permissions: node.permissions,
        breadcrumbs,
      });
    }

    if (node.children?.length) {
      const nextAncestors = node.path
        ? breadcrumbs
        : [...ancestors, { label: node.label }];
      walkNodes(node.children, nextAncestors, registry);
    }
  }
}

/** Índice path → metadatos de ruta derivado del menú (fuente de verdad compartida con el Sidebar). */
export function collectMenuRoutes(menu: MenuConfig): Map<string, MenuRoute> {
  const registry = new Map<string, MenuRoute>();
  walkNodes(menu.items, [], registry);
  return registry;
}
