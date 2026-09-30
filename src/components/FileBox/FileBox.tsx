import { useId, useRef, useState, useMemo, useEffect } from 'react';
import { createPortal } from 'react-dom';
import type { CSSProperties, DragEvent, ChangeEvent } from 'react';
import type { FileBoxProps } from './type/FileBox.types';
import { resolveTheme, themeToStyle } from '@/components/TextBox/theme/resolveTheme';
import { resolveShowClearButton } from '@/shared/resolveShowClearButton';
import { formatFileSize, summarizeFiles } from './utils/fileValidation';
import { useFileBoxState } from './hooks/useFileBoxState';
import { useObjectUrls } from './hooks/useObjectUrls';
import { fileKey, moveFileItem, stableFileKeys } from './utils/reorder';
import '@/components/FileBox/css/FileBox.css';

function UploadIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M12 16V4" strokeLinecap="round" />
      <path d="M7 9l5-5 5 5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" strokeLinecap="round" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <line x1="12" y1="5" x2="12" y2="19" strokeLinecap="round" />
      <line x1="5" y1="12" x2="19" y2="12" strokeLinecap="round" />
    </svg>
  );
}

const DRAG_ACTIVATION_PX = 4;

function fileExtension(file: File): string {
  const lastDot = file.name.lastIndexOf('.');
  return lastDot > 0 && lastDot < file.name.length - 1
    ? file.name.slice(lastDot + 1).toUpperCase().slice(0, 4)
    : 'FILE';
}

export function FileBox(props: Readonly<FileBoxProps>) {
  const {
    variant = 'primary',
    size = 'md',
    label,
    labelPosition = 'top',
    displayMode = 'field',
    placeholder = 'Ningún archivo seleccionado',
    buttonLabel = 'Elegir archivo',
    value: controlledValue,
    defaultValue,
    multiple = false,
    reorderable = false,
    accept,
    maxSize,
    maxFiles,
    helperText,
    error = false,
    errorMessage,
    disabled = false,
    fullWidth = false,
    width,
    theme,
    className,
    id: idProp,
    name,
    iconLeft,
    clearable,
    showClearButton,
    onChange,
    onReject,
  } = props;

  const autoId = useId();
  const inputId = idProp ?? autoId;
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const dragDepthRef = useRef(0);

  const isMultiple = multiple || reorderable;

  const { files, ingest, clearAll, removeAt, moveAt } = useFileBoxState({
    value: controlledValue,
    defaultValue,
    multiple: isMultiple,
    accept,
    maxSize,
    maxFiles,
    disabled,
    onChange,
    onReject,
  });

  const hasError = error || Boolean(errorMessage);
  const displayMessage = hasError ? errorMessage : helperText;
  const canClear = resolveShowClearButton({ showClearButton, clearable });
  const showClear = canClear && files.length > 0 && !disabled;
  const isDropzone = displayMode === 'dropzone';
  const isLeft = labelPosition === 'left';

  /* ── Reordenamiento ── */

  const stripRef = useRef<HTMLUListElement>(null);
  const dragRef = useRef<{
    from: number;
    to: number;
    pointerX: number;
    pointerY: number;
  } | null>(null);
  const dragCleanupRef = useRef<(() => void) | null>(null);
  const [ghostMetrics, setGhostMetrics] = useState<{
    offsetX: number;
    offsetY: number;
    width: number;
    height: number;
  } | null>(null);
  const [reorderDrag, setReorderDrag] = useState<{
    from: number;
    to: number;
    pointerX: number;
    pointerY: number;
  } | null>(null);

  useEffect(() => {
    return () => {
      dragCleanupRef.current?.();
    };
  }, []);

  const applyDrag = (
    next: { from: number; to: number; pointerX: number; pointerY: number } | null,
  ) => {
    dragRef.current = next;
    setReorderDrag(next);
  };

  const displayFiles = reorderDrag
    ? moveFileItem(files, reorderDrag.from, reorderDrag.to)
    : files;

  const thumbUrls = useObjectUrls(files);
  const urlsByKey = useMemo(() => {
    const map = new Map<string, string>();
    files.forEach((file, index) => {
      map.set(fileKey(file), thumbUrls[index] ?? '');
    });
    return map;
  }, [files, thumbUrls]);

  const tileKeys = useMemo(() => stableFileKeys(displayFiles), [displayFiles]);

  const draggedFile = reorderDrag ? files[reorderDrag.from] : null;

  /**
   * Índice de inserción contando solo los tiles que NO se están arrastrando:
   * el tile arrastrado se ignora para que su propio midpoint no sea un blanco móvil.
   * En una fila, cuenta los tiles cuyo centro quedó a la izquierda del puntero;
   * con wrap, las filas superiores cuentan como "antes".
   */
  const computeTargetIndex = (
    clientX: number,
    clientY: number,
    currentTo: number,
  ): number => {
    const strip = stripRef.current;
    if (!strip) return currentTo;
    const tiles = Array.from(
      strip.querySelectorAll<HTMLElement>('[data-file-index]'),
    );
    if (tiles.length <= 1) return 0;

    let count = 0;
    for (const tile of tiles) {
      if (Number(tile.dataset.fileIndex) === currentTo) continue;
      const rect = tile.getBoundingClientRect();
      const midX = rect.left + rect.width / 2;
      const inRow = clientY >= rect.top && clientY <= rect.bottom;
      const isAfter = clientY > rect.bottom || (inRow && clientX > midX);
      if (isAfter) count += 1;
    }
    return Math.min(count, tiles.length - 1);
  };

  const handleTilePointerDown = (
    event: React.PointerEvent<HTMLLIElement>,
    index: number,
  ) => {
    if (disabled || !reorderable) return;
    if (event.pointerType === 'mouse' && event.button !== 0) return;

    const pointerId = event.pointerId;
    const startX = event.clientX;
    const startY = event.clientY;
    const rect = event.currentTarget.getBoundingClientRect();
    setGhostMetrics({
      offsetX: startX - rect.left,
      offsetY: startY - rect.top,
      width: rect.width,
      height: rect.height,
    });

    // La sesión de drag usa listeners de documento (no pointer capture):
    // React mueve el nodo capturado al reordenar y el navegador liberaría
    // la captura, cancelando el drag al arrastrar hacia la derecha.
    let activated = false;

    const onMove = (e: PointerEvent) => {
      if (e.pointerId !== pointerId) return;
      if (!activated) {
        const distance = Math.abs(e.clientX - startX) + Math.abs(e.clientY - startY);
        if (distance < DRAG_ACTIVATION_PX) return;
        activated = true;
        applyDrag({
          from: index,
          to: index,
          pointerX: e.clientX,
          pointerY: e.clientY,
        });
        return;
      }
      const current = dragRef.current;
      if (!current) return;
      const to = computeTargetIndex(e.clientX, e.clientY, current.to);
      applyDrag({
        ...current,
        to,
        pointerX: e.clientX,
        pointerY: e.clientY,
      });
    };

    const finish = (e: PointerEvent) => {
      if (e.pointerId !== pointerId) return;
      const current = dragRef.current;
      if (e.type === 'pointerup' && current && current.from !== current.to) {
        moveAt(current.from, current.to);
      }
      applyDrag(null);
      setGhostMetrics(null);
      teardown();
    };

    const cancelWithEscape = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      applyDrag(null);
      setGhostMetrics(null);
      teardown();
    };

    const teardown = () => {
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerup', finish);
      document.removeEventListener('pointercancel', finish);
      document.removeEventListener('keydown', cancelWithEscape);
      dragCleanupRef.current = null;
    };

    dragCleanupRef.current?.();
    dragCleanupRef.current = teardown;
    document.addEventListener('pointermove', onMove);
    document.addEventListener('pointerup', finish);
    document.addEventListener('pointercancel', finish);
    document.addEventListener('keydown', cancelWithEscape);
  };

  const handleTileKeyDown = (
    event: React.KeyboardEvent<HTMLLIElement>,
    index: number,
  ) => {
    if (disabled || !reorderable) return;
    if (event.key === 'ArrowLeft' && index > 0) {
      event.preventDefault();
      moveAt(index, index - 1);
    } else if (event.key === 'ArrowRight' && index < files.length - 1) {
      event.preventDefault();
      moveAt(index, index + 1);
    }
  };

  const themeStyle = themeToStyle(resolveTheme(theme));
  const computedStyle: CSSProperties = {
    ...themeStyle,
    ...(width != null
      ? {
          width:
            typeof width === 'number' || /^\d+$/.test(String(width))
              ? `${width}px`
              : width,
        }
      : {}),
  };

  const classNames = [
    'glb-filebox',
    `glb-filebox--${variant}`,
    `glb-filebox--${size}`,
    fullWidth && 'glb-filebox--full-width',
    hasError && 'glb-filebox--error',
    isDropzone && 'glb-filebox--dropzone',
    isLeft && 'glb-filebox--left',
    dragging && 'glb-filebox--dragging',
    disabled && 'glb-filebox--disabled',
    reorderable && 'glb-filebox--reorderable',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    ingest(e.target.files ? Array.from(e.target.files) : []);
    e.target.value = '';
  };

  const openPicker = () => {
    if (!disabled) inputRef.current?.click();
  };

  const handleClear = () => {
    clearAll();
    if (inputRef.current) inputRef.current.value = '';
  };

  const onDragEnter = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled) return;
    dragDepthRef.current += 1;
    setDragging(true);
  };

  const onDragOver = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled) return;
    if (e.dataTransfer) {
      e.dataTransfer.dropEffect = 'copy';
    }
    if (!dragging) {
      setDragging(true);
    }
  };

  const onDragLeave = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled) return;
    dragDepthRef.current -= 1;
    if (dragDepthRef.current <= 0) {
      dragDepthRef.current = 0;
      setDragging(false);
    }
  };

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragDepthRef.current = 0;
    setDragging(false);
    if (disabled) return;

    const dropped: File[] = [];
    if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
      dropped.push(...Array.from(e.dataTransfer.files));
    } else if (e.dataTransfer?.items && e.dataTransfer.items.length > 0) {
      for (let i = 0; i < e.dataTransfer.items.length; i++) {
        const item = e.dataTransfer.items[i];
        if (item?.kind === 'file') {
          const file = item.getAsFile();
          if (file) dropped.push(file);
        }
      }
    }

    if (dropped.length > 0) {
      if (inputRef.current && typeof DataTransfer !== 'undefined') {
        try {
          const dt = new DataTransfer();
          dropped.forEach((f) => dt.items.add(f));
          inputRef.current.files = dt.files;
        } catch {
          // ignore DataTransfer failure in unsupported environments
        }
      }
      ingest(dropped);
    }
  };

  const labelEl = label && (
    <label className="glb-filebox__label" htmlFor={inputId}>
      {label}
    </label>
  );

  const fileList = reorderable ? (
    <div
      className="glb-filebox__thumb-area"
      onDragEnter={onDragEnter}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <ul
        ref={stripRef}
        className={[
          'glb-filebox__thumb-strip',
          reorderDrag && 'glb-filebox__thumb-strip--dragging',
        ]
          .filter(Boolean)
          .join(' ')}
        role="list"
        aria-label="Archivos seleccionados"
      >
        {displayFiles.map((file, index) => {
          const isImage = file.type.startsWith('image/');
          const isDragged = reorderDrag?.to === index;

          return (
            <li
              key={tileKeys[index] ?? `${file.name}-${index}`}
              data-file-index={index}
              className={[
                'glb-filebox__thumb',
                isDragged && 'glb-filebox__thumb--source',
              ]
                .filter(Boolean)
                .join(' ')}
              role="listitem"
              tabIndex={reorderable && !disabled ? 0 : -1}
              aria-label={`Archivo ${file.name}, posición ${index + 1} de ${files.length}`}
              onPointerDown={(e) => handleTilePointerDown(e, index)}
              onKeyDown={(e) => handleTileKeyDown(e, index)}
            >
              {isImage && urlsByKey.get(fileKey(file)) ? (
                <img
                  className="glb-filebox__thumb-img"
                  src={urlsByKey.get(fileKey(file))}
                  alt={file.name}
                  draggable={false}
                />
              ) : (
                <span className="glb-filebox__thumb-fallback" aria-hidden="true">
                  {fileExtension(file)}
                </span>
              )}
              {!disabled && (
                <button
                  type="button"
                  className="glb-filebox__thumb-remove"
                  aria-label={`Quitar ${file.name}`}
                  onPointerDown={(e) => e.stopPropagation()}
                  onClick={() => removeAt(index)}
                >
                  ×
                </button>
              )}
            </li>
          );
        })}
        {!disabled && (maxFiles == null || files.length < maxFiles) && (
          <li className="glb-filebox__thumb-add-item">
            <button
              type="button"
              className="glb-filebox__thumb-add"
              onClick={openPicker}
              aria-label="Agregar archivo"
            >
              <PlusIcon />
            </button>
          </li>
        )}
      </ul>

      {maxFiles != null && (
        <span className="glb-filebox__thumb-counter">
          {files.length}/{maxFiles}
        </span>
      )}
    </div>
  ) : (
    (isDropzone || multiple) &&
    files.length > 0 && (
      <ul className="glb-filebox__list" aria-label="Archivos seleccionados">
        {files.map((file, index) => (
          <li
            key={`${file.name}-${file.size}-${file.lastModified}-${index}`}
            className="glb-filebox__item"
          >
            <span className="glb-filebox__item-name" title={file.name}>
              {file.name}
            </span>
            <span className="glb-filebox__item-size">{formatFileSize(file.size)}</span>
            {!disabled && (
              <button
                type="button"
                className="glb-filebox__item-remove"
                onClick={() => removeAt(index)}
                aria-label={`Quitar ${file.name}`}
              >
                ×
              </button>
            )}
          </li>
        ))}
      </ul>
    )
  );

  return (
    <div className={classNames} style={computedStyle}>
      <div className="glb-filebox__row">
        {label && !isDropzone && !isLeft && labelEl}
        {label && isLeft && labelEl}

        <div
          className="glb-filebox__control"
          role="group"
          aria-invalid={hasError || undefined}
          aria-describedby={displayMessage ? `${inputId}-helper` : undefined}
          onDragEnter={onDragEnter}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
        >
          <input
            ref={inputRef}
            id={inputId}
            type="file"
            className="glb-filebox__native"
            name={name}
            accept={accept}
            multiple={isMultiple}
            disabled={disabled}
            onChange={handleInputChange}
            tabIndex={-1}
            aria-hidden="true"
          />

          {isDropzone ? (
            <div
              role="button"
              tabIndex={disabled ? -1 : 0}
              className="glb-filebox__dropzone"
              aria-disabled={disabled || undefined}
              onClick={openPicker}
              onKeyDown={(e) => {
                if (disabled) return;
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  openPicker();
                }
              }}
            >
              <span className="glb-filebox__drop-icon" aria-hidden="true">
                <UploadIcon />
              </span>
              <span className="glb-filebox__drop-title">
                {label ?? 'Arrastrá archivos aquí'}
              </span>
              <span className="glb-filebox__drop-hint">
                o hacé clic para seleccionar
              </span>
            </div>
          ) : (
            !reorderable && (
              <div className="glb-filebox__field">
                {iconLeft && (
                  <span className="glb-filebox__icon" aria-hidden="true">
                    {iconLeft}
                  </span>
                )}
                <span
                  className={[
                    'glb-filebox__filename',
                    files.length === 0 && 'glb-filebox__filename--empty',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  {files.length === 0
                    ? placeholder
                    : isMultiple
                      ? `${files.length} archivo${files.length === 1 ? '' : 's'} seleccionado${files.length === 1 ? '' : 's'}`
                      : summarizeFiles(files)}
                </span>
                {showClear && (
                  <button
                    type="button"
                    className="glb-filebox__clear"
                    onClick={handleClear}
                    aria-label="Quitar archivos"
                  >
                    ×
                  </button>
                )}
                <button
                  type="button"
                  className="glb-filebox__browse"
                  disabled={disabled}
                  onClick={openPicker}
                >
                  {buttonLabel}
                </button>
              </div>
            )
          )}
        </div>
      </div>

      {/* Lista de archivos: strip de miniaturas si reorderable; si no, lista común */}
      {fileList}

      {displayMessage && (
        <span
          id={`${inputId}-helper`}
          className={`glb-filebox__helper${hasError ? ' glb-filebox__helper--error' : ''}`}
        >
          {displayMessage}
        </span>
      )}

      {/* Fantasma flotante que sigue al puntero mientras se reordena */}
      {reorderDrag &&
        draggedFile &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            className="glb-filebox__thumb-ghost"
            aria-hidden="true"
            style={{
              width: ghostMetrics?.width,
              height: ghostMetrics?.height,
              transform: `translate3d(${reorderDrag.pointerX - (ghostMetrics?.offsetX ?? 0)}px, ${reorderDrag.pointerY - (ghostMetrics?.offsetY ?? 0)}px, 0)`,
            }}
          >
            {draggedFile.type.startsWith('image/') &&
            urlsByKey.get(fileKey(draggedFile)) ? (
              <img
                className="glb-filebox__thumb-ghost-img"
                src={urlsByKey.get(fileKey(draggedFile))}
                alt=""
                draggable={false}
              />
            ) : (
              <span className="glb-filebox__thumb-ghost-fallback">
                {fileExtension(draggedFile)}
              </span>
            )}
          </div>,
          document.body,
        )}
    </div>
  );
}

export const FileUploader = FileBox;
