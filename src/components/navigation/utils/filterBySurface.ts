import type { NavigationNode, NavSurface } from '../type/Navigation.types';

/**
 * Árbol filtrado por `surface`.
 * - Si el nodo coincide, se incluye con hijos ya filtrados.
 * - Si no coincide, no se incluye; se promueven descendientes que sí matchean.
 *
 * Uso típico: `filterBySurface(navigation, 'sidebar')` para `<Sidebar />`.
 */
export function filterBySurface(
  nodes: readonly NavigationNode[],
  surface: NavSurface,
): NavigationNode[] {
  if (!Array.isArray(nodes)) return [];

  const result: NavigationNode[] = [];

  for (const node of nodes) {
    const filteredChildren = filterBySurface(node.children ?? [], surface);

    if (node.surface === surface) {
      result.push({
        ...node,
        children: filteredChildren,
      });
    } else {
      result.push(...filteredChildren);
    }
  }

  return result;
}

/**
 * Lista plana: solo nodos cuya `surface` coincide (sin rearmar árbol).
 * Útil para `content` / `actions` desde los hijos del nodo activo.
 */
export function filterNodesBySurface(
  nodes: readonly NavigationNode[],
  surface: NavSurface,
): NavigationNode[] {
  if (!Array.isArray(nodes)) return [];
  return nodes.filter((node) => node.surface === surface);
}
