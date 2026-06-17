import { useState, useEffect, useRef, useCallback } from 'react';
import type { CSSProperties } from 'react';
import { createPortal } from 'react-dom';
import { formatDisplay } from './dateUtils';
import { CalendarPanel } from './CalendarPanel';
import { CalendarIcon } from './CalendarIcons';
import { useFloatingPosition } from './useFloatingPosition';

export type CalendarTriggerMode = 'input' | 'icon';

interface CalendarDropdownProps {
  value: string;
  onChange: (dateStr: string) => void;
  min?: string;
  max?: string;
  disabled?: boolean;
  /** Prefijo de clase CSS, ej. 'glb-datebox' o 'glb-rangedatebox' */
  classPrefix?: string;
  /** 'input': campo de texto. 'icon': solo botón con icono de calendario */
  triggerMode?: CalendarTriggerMode;
  /** Etiqueta accesible del trigger en modo icono */
  iconAriaLabel?: string;
  /** Variables CSS del tema para el dropdown en portal */
  dropdownThemeStyle?: CSSProperties;
  /** Inicio del rango a resaltar en el calendario (YYYY-MM-DD) */
  rangeStart?: string;
  /** Fin del rango a resaltar en el calendario (YYYY-MM-DD) */
  rangeEnd?: string;
}

export function CalendarDropdown({
  value,
  onChange,
  min,
  max,
  disabled,
  classPrefix = 'glb-datebox',
  triggerMode = 'input',
  iconAriaLabel = 'Seleccionar fecha',
  dropdownThemeStyle,
  rangeStart,
  rangeEnd,
}: Readonly<CalendarDropdownProps>) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement | HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const cls = (suffix: string) => `${classPrefix}__${suffix}`;
  const isIconMode = triggerMode === 'icon';

  const coords = useFloatingPosition(isOpen, triggerRef, dropdownRef);

  const close = useCallback(() => setIsOpen(false), []);

  const toggle = useCallback(() => {
    if (disabled) return;
    setIsOpen(prev => !prev);
  }, [disabled]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        containerRef.current?.contains(target)
        || dropdownRef.current?.contains(target)
      ) {
        return;
      }
      close();
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isOpen, close]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close();
        triggerRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, close]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggle();
    }
    if (e.key === 'ArrowDown' && !isOpen) {
      e.preventDefault();
      setIsOpen(true);
    }
  };

  const handleSelect = (dateStr: string) => {
    onChange(dateStr);
    close();
  };

  const displayText = formatDisplay(value);
  const hasValue = value.length > 0;

  const dropdownPanel = isOpen ? createPortal(
    <div
      ref={dropdownRef}
      className={`${cls('dropdown')} ${cls('dropdown--floating')}${coords ? ` ${cls('dropdown--positioned')}` : ''}`}
      role="dialog"
      aria-label="Calendario"
      style={{
        ...(dropdownThemeStyle ?? {}),
        position: 'fixed',
        top: coords?.top ?? -9999,
        left: coords?.left ?? -9999,
        maxHeight: coords?.maxHeight,
        overflowY: coords?.maxHeight ? 'auto' : undefined,
        visibility: coords ? 'visible' : 'hidden',
        zIndex: 10000,
      }}
    >
      <CalendarPanel
        value={value}
        onChange={handleSelect}
        min={min}
        max={max}
        classPrefix={classPrefix}
        onSelect={close}
        rangeStart={rangeStart}
        rangeEnd={rangeEnd}
      />
    </div>,
    document.body,
  ) : null;

  return (
    <div
      className={`${cls('calendar-container')}${isIconMode ? ` ${cls('calendar-container--icon')}` : ''}`}
      ref={containerRef}
    >
      {isIconMode ? (
        <button
          ref={triggerRef as React.RefObject<HTMLButtonElement>}
          type="button"
          className={`${cls('icon-trigger')}${hasValue ? ` ${cls('icon-trigger--has-value')}` : ''}${isOpen ? ` ${cls('icon-trigger--open')}` : ''}`}
          disabled={disabled}
          onClick={toggle}
          onKeyDown={handleKeyDown}
          aria-expanded={isOpen}
          aria-haspopup="dialog"
          aria-label={hasValue ? `${iconAriaLabel}: ${displayText}` : iconAriaLabel}
        >
          <CalendarIcon size={18} />
          {hasValue && (
            <span className={cls('icon-trigger-badge')} aria-hidden="true" />
          )}
        </button>
      ) : (
        <input
          ref={triggerRef as React.RefObject<HTMLInputElement>}
          type="text"
          className={cls('display-input')}
          value={displayText}
          placeholder="Seleccionar fecha"
          readOnly
          disabled={disabled}
          onClick={toggle}
          onKeyDown={handleKeyDown}
          aria-expanded={isOpen}
          aria-haspopup="dialog"
          role="combobox"
        />
      )}

      {dropdownPanel}
    </div>
  );
}
