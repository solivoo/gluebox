import { useCallback, useMemo, useState } from 'react';
import type { MenuItem } from '../type/menu.types';
import { findAncestorIdsByPath } from '../utils/findParentItemId';

interface ExpansionState {
  openIds: Set<string>;
  /** Módulos/nodos que el usuario cerró explícitamente (prevalece sobre auto-expansión) */
  userCollapsedIds: Set<string>;
}

function createInitialExpanded(
  items: MenuItem[],
  activePath?: string,
): Set<string> {
  return new Set(findAncestorIdsByPath(items, activePath));
}

function isTopLevelItem(itemId: string, items: MenuItem[]): boolean {
  return items.some((item) => item.id === itemId);
}

/** Ids que deben abrirse automáticamente según la ruta activa */
function getAutoExpandedIds(items: MenuItem[], activePath?: string): Set<string> {
  const ids = new Set(findAncestorIdsByPath(items, activePath));
  for (const item of items) {
    if (item.path && item.path === activePath && item.children?.length) {
      ids.add(item.id);
    }
  }
  return ids;
}

function computeExpandedIds(
  openIds: Set<string>,
  userCollapsedIds: Set<string>,
  items: MenuItem[],
  activePath?: string,
): Set<string> {
  const merged = new Set(openIds);
  for (const id of getAutoExpandedIds(items, activePath)) {
    merged.add(id);
  }
  for (const id of userCollapsedIds) {
    merged.delete(id);
  }
  return merged;
}

interface UseExpandedItemsOptions {
  items: MenuItem[];
  activePath?: string;
  collapseOthersOnSelect: boolean;
  collapseOnNavigate: boolean;
}

export function useExpandedItems({
  items,
  activePath,
  collapseOthersOnSelect,
  collapseOnNavigate,
}: UseExpandedItemsOptions) {
  const [state, setState] = useState<ExpansionState>(() => ({
    openIds: createInitialExpanded(items, activePath),
    userCollapsedIds: new Set(),
  }));

  const expandedIds = useMemo(
    () => computeExpandedIds(state.openIds, state.userCollapsedIds, items, activePath),
    [state.openIds, state.userCollapsedIds, items, activePath],
  );

  const toggleExpand = useCallback(
    (itemId: string) => {
      setState((prev) => {
        const isOpen = computeExpandedIds(
          prev.openIds,
          prev.userCollapsedIds,
          items,
          activePath,
        ).has(itemId);

        const nextOpen = new Set(prev.openIds);
        const nextCollapsed = new Set(prev.userCollapsedIds);

        if (isOpen) {
          nextCollapsed.add(itemId);
          nextOpen.delete(itemId);
          return { openIds: nextOpen, userCollapsedIds: nextCollapsed };
        }

        nextCollapsed.delete(itemId);

        if (collapseOthersOnSelect && isTopLevelItem(itemId, items)) {
          for (const item of items) {
            if (item.id !== itemId) {
              nextCollapsed.add(item.id);
              nextOpen.delete(item.id);
            }
          }
        }

        nextOpen.add(itemId);
        return { openIds: nextOpen, userCollapsedIds: nextCollapsed };
      });
    },
    [collapseOthersOnSelect, items, activePath],
  );

  const syncOnNavigate = useCallback(
    (path: string) => {
      const autoIds = getAutoExpandedIds(items, path);

      if (!collapseOnNavigate) {
        if (autoIds.size === 0) return;

        setState((prev) => {
          const nextOpen = new Set([...prev.openIds, ...autoIds]);
          const nextCollapsed = new Set(prev.userCollapsedIds);
          for (const id of autoIds) {
            nextCollapsed.delete(id);
          }
          return { openIds: nextOpen, userCollapsedIds: nextCollapsed };
        });
        return;
      }

      if (autoIds.size === 0) {
        return;
      }

      if (collapseOthersOnSelect) {
        setState((prev) => {
          const nextCollapsed = new Set(prev.userCollapsedIds);
          for (const id of autoIds) {
            nextCollapsed.delete(id);
          }
          for (const item of items) {
            if (!autoIds.has(item.id)) {
              nextCollapsed.add(item.id);
            }
          }
          return { openIds: new Set(autoIds), userCollapsedIds: nextCollapsed };
        });
        return;
      }

      setState((prev) => {
        const nextOpen = new Set([...prev.openIds, ...autoIds]);
        const nextCollapsed = new Set(prev.userCollapsedIds);
        for (const id of autoIds) {
          nextCollapsed.delete(id);
        }
        return { openIds: nextOpen, userCollapsedIds: nextCollapsed };
      });
    },
    [collapseOnNavigate, collapseOthersOnSelect, items],
  );

  const isExpanded = useCallback(
    (itemId: string) => expandedIds.has(itemId),
    [expandedIds],
  );

  return { isExpanded, toggleExpand, syncOnNavigate };
}
