import type { NavigationNode } from '../type/Navigation.types';

/** Busca un nodo por `id` en el árbol. */
export function findNavigationNodeById(
  nodes: readonly NavigationNode[],
  id: string,
): NavigationNode | null {
  if (!Array.isArray(nodes)) return null;

  for (const node of nodes) {
    if (node.id === id) return node;
    const found = findNavigationNodeById(node.children ?? [], id);
    if (found) return found;
  }

  return null;
}

/**
 * Busca el nodo `view`/`action` cuya `route` coincide (normalizada).
 * Útil para resolver el nodo activo desde la URL del SPA.
 */
export function findNavigationNodeByRoute(
  nodes: readonly NavigationNode[],
  route: string,
): NavigationNode | null {
  if (!Array.isArray(nodes) || !route) return null;
  const normalized = normalizeRoute(route);

  for (const node of nodes) {
    if (node.route != null && normalizeRoute(node.route) === normalized) {
      return node;
    }
    const found = findNavigationNodeByRoute(node.children ?? [], route);
    if (found) return found;
  }

  return null;
}

function normalizeRoute(route: string): string {
  return route.replace(/^\/+|\/+$/g, '');
}
