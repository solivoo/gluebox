import type { NavigationNode } from '../type/Navigation.types';
import { childrenOf } from './childrenOf';
import { filterNodesBySurface } from './filterBySurface';

/**
 * Acciones de página del nodo activo: hijos con `surface: 'actions'`.
 * Input típico del `<PageActionsMenu items={…} />`.
 */
export function pageActionsFromNode(
  activeNode: NavigationNode | null | undefined,
): NavigationNode[] {
  return filterNodesBySurface(childrenOf(activeNode), 'actions');
}

/**
 * Tabs / subvistas del content: hijos con `surface: 'content'`.
 * Pensado para un futuro `<SectionNav />`.
 */
export function contentTabsFromNode(
  activeNode: NavigationNode | null | undefined,
): NavigationNode[] {
  return filterNodesBySurface(childrenOf(activeNode), 'content');
}
