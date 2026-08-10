import { useCallback, useMemo, useState } from 'react';
import type { FileBoxProps } from '../type/FileBox.types';
import { filterIncomingFiles } from '../utils/fileValidation';

interface UseFileBoxStateOptions {
  value?: File[];
  defaultValue?: File[];
  multiple: boolean;
  accept?: string;
  maxSize?: number;
  maxFiles?: number;
  disabled: boolean;
  onChange?: FileBoxProps['onChange'];
  onReject?: FileBoxProps['onReject'];
}

export function useFileBoxState(options: UseFileBoxStateOptions): {
  files: File[];
  ingest: (incoming: File[]) => void;
  clearAll: () => void;
  removeAt: (index: number) => void;
} {
  const {
    value: controlledValue,
    defaultValue,
    multiple,
    accept,
    maxSize,
    maxFiles,
    disabled,
    onChange,
    onReject,
  } = options;

  const isControlled = controlledValue !== undefined;
  const [internalFiles, setInternalFiles] = useState<File[]>(defaultValue ?? []);
  const files = useMemo(
    () => (isControlled ? (controlledValue ?? []) : internalFiles),
    [controlledValue, internalFiles, isControlled],
  );

  const commit = useCallback(
    (next: File[]) => {
      if (!isControlled) setInternalFiles(next);
      onChange?.(next);
    },
    [isControlled, onChange],
  );

  const ingest = useCallback(
    (incoming: File[]) => {
      if (disabled || incoming.length === 0) return;
      const base = multiple ? files : [];
      const { accepted, rejected } = filterIncomingFiles({
        incoming,
        current: base,
        accept,
        maxSize,
        maxFiles,
        multiple,
      });
      if (rejected.length) onReject?.(rejected);
      if (!accepted.length) return;
      commit(multiple ? [...base, ...accepted] : accepted);
    },
    [accept, commit, disabled, files, maxFiles, maxSize, multiple, onReject],
  );

  const clearAll = useCallback(() => commit([]), [commit]);

  const removeAt = useCallback(
    (index: number) => commit(files.filter((_, i) => i !== index)),
    [commit, files],
  );

  return { files, ingest, clearAll, removeAt };
}
