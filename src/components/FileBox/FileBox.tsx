import { useId, useRef, useState } from 'react';
import type { CSSProperties, DragEvent, ChangeEvent } from 'react';
import type { FileBoxProps } from './type/FileBox.types';
import { resolveTheme, themeToStyle } from '@/components/TextBox/theme/resolveTheme';
import { resolveShowClearButton } from '@/shared/resolveShowClearButton';
import { formatFileSize, summarizeFiles } from './utils/fileValidation';
import { useFileBoxState } from './hooks/useFileBoxState';
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
  const { files, ingest, clearAll, removeAt } = useFileBoxState({
    value: controlledValue,
    defaultValue,
    multiple,
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
        if (item.kind === 'file') {
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
            multiple={multiple}
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
                  : multiple
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
          )}
        </div>
      </div>

      {/* Lista de archivos: siempre en dropzone; en field solo si multiple */}
      {(isDropzone || multiple) && files.length > 0 && (
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
      )}

      {displayMessage && (
        <span
          id={`${inputId}-helper`}
          className={`glb-filebox__helper${hasError ? ' glb-filebox__helper--error' : ''}`}
        >
          {displayMessage}
        </span>
      )}
    </div>
  );
}

export const FileUploader = FileBox;
