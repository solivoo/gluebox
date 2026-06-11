import { useCallback, useMemo, useState } from 'react';
import type { MenuItem } from '../type/menu.types';
import { findParentItemIdByPath } from '../utils/findParentItemId';

function createInitialExpanded(
  items: MenuItem[],
  activePath?: string,
): Set<string> {
  const parentId = findParentItemIdByPath(items, activePath);
  return parentId ? new Set([parentId]) : new Set();
}

interface UseExpandedItemsOptions {
  items: MenuItem[];
  activePath?: string;
  collapseOthersOnSelect: boolean;
}

export function useExpandedItems({
  items,
  activePath,
  collapseOthersOnSelect,
}: UseExpandedItemsOptions) {
  const [openIds, setOpenIds] = useState<Set<string>>(() =>
    createInitialExpanded(items, activePath),
  );

  const parentFromActive = findParentItemIdByPath(items, activePath);

  const expandedIds = useMemo(() => {
    if (collapseOthersOnSelect) {
      if (parentFromActive) {
        return new Set([parentFromActive]);
      }
      return openIds;
    }

    const merged = new Set(openIds);
    if (parentFromActive) {
      merged.add(parentFromActive);
    }
    return merged;
  }, [collapseOthersOnSelect, parentFromActive, openIds]);

  const toggleExpand = useCallback(
    (itemId: string) => {
      setOpenIds((prev) => {
        if (collapseOthersOnSelect) {
          return prev.has(itemId) ? new Set<string>() : new Set([itemId]);
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
    [collapseOthersOnSelect],
  );

  const syncOnNavigate = useCallback(
    (path: string) => {
      const parentId = findParentItemIdByPath(items, path);

      if (collapseOthersOnSelect) {
        setOpenIds(parentId ? new Set([parentId]) : new Set());
        return;
      }

      if (parentId) {
        setOpenIds((prev) => new Set([...prev, parentId]));
      }
    },
    [collapseOthersOnSelect, items],
  );

  const isExpanded = useCallback(
    (itemId: string) => expandedIds.has(itemId),
    [expandedIds],
  );

  return { isExpanded, toggleExpand, syncOnNavigate };
}
