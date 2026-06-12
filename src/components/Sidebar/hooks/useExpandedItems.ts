import { useCallback, useMemo, useState } from 'react';
import type { MenuItem } from '../type/menu.types';
import { findAncestorIdsByPath } from '../utils/findParentItemId';

function createInitialExpanded(
  items: MenuItem[],
  activePath?: string,
): Set<string> {
  return new Set(findAncestorIdsByPath(items, activePath));
}

function isTopLevelItem(itemId: string, items: MenuItem[]): boolean {
  return items.some((item) => item.id === itemId);
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
  const [openIds, setOpenIds] = useState<Set<string>>(() =>
    createInitialExpanded(items, activePath),
  );

  const ancestorsFromActive = findAncestorIdsByPath(items, activePath);

  const expandedIds = useMemo(() => {
    const merged = new Set(openIds);
    for (const id of ancestorsFromActive) {
      merged.add(id);
    }
    // Abrir módulo cuando la ruta activa es su inicio (/facturacion, etc.)
    for (const item of items) {
      if (item.path && item.path === activePath && item.children?.length) {
        merged.add(item.id);
      }
    }
    return merged;
  }, [ancestorsFromActive, openIds, items, activePath]);

  const toggleExpand = useCallback(
    (itemId: string) => {
      setOpenIds((prev) => {
        if (collapseOthersOnSelect && isTopLevelItem(itemId, items)) {
          if (prev.has(itemId)) {
            const next = new Set(prev);
            next.delete(itemId);
            return next;
          }

          const next = new Set<string>();
          for (const id of prev) {
            if (!isTopLevelItem(id, items)) {
              next.add(id);
            }
          }
          next.add(itemId);
          return next;
        }

        const next = new Set(prev);
        if (next.has(itemId)) {
          next.delete(itemId);
        } else {
          next.add(itemId);
        }
        return next;
      });
    },
    [collapseOthersOnSelect, items],
  );

  const syncOnNavigate = useCallback(
    (path: string) => {
      const ancestors = findAncestorIdsByPath(items, path);

      if (!collapseOnNavigate) {
        if (ancestors.length > 0) {
          setOpenIds((prev) => new Set([...prev, ...ancestors]));
        }
        return;
      }

      if (ancestors.length === 0) {
        return;
      }

      if (collapseOthersOnSelect) {
        setOpenIds(() => new Set(ancestors));
        return;
      }

      setOpenIds((prev) => new Set([...prev, ...ancestors]));
    },
    [collapseOnNavigate, collapseOthersOnSelect, items],
  );

  const isExpanded = useCallback(
    (itemId: string) => expandedIds.has(itemId),
    [expandedIds],
  );

  return { isExpanded, toggleExpand, syncOnNavigate };
}
