import type { NavigationNode } from '../type/Navigation.types';

/** Hijos del nodo activo (o `[]` si no hay nodo). */
export function childrenOf(
  node: NavigationNode | null | undefined,
): NavigationNode[] {
  if (!node || !Array.isArray(node.children)) return [];
  return node.children;
}
