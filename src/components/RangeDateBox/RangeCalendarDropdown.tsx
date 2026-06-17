import { useState, useEffect, useRef, useCallback } from 'react';
import type { CSSProperties } from 'react';
import { createPortal } from 'react-dom';
import { formatDisplay } from '../DateBox/dateUtils';
import { CalendarPanel } from '../DateBox/CalendarPanel';
import { CalendarIcon } from '../DateBox/CalendarIcons';
import { useFloatingPosition } from '../DateBox/useFloatingPosition';

interface RangeCalendarDropdownProps {
  startValue: string;
  endValue: string;
  onStartChange: (dateStr: string) => void;
  onEndChange: (dateStr: string) => void;
  min?: string;
  max?: string;
  disabled?: boolean;
  classPrefix?: string;
  dropdownThemeStyle?: CSSProperties;
  iconAriaLabel?: string;
}

export function RangeCalendarDropdown({
  startValue,
  endValue,
  onStartChange,
  onEndChange,
  min,
  max,
  disabled,
  classPrefix = 'glb-rangedatebox',
  dropdownThemeStyle,
  iconAriaLabel = 'Seleccionar rango de fechas',
}: Readonly<RangeCalendarDropdownProps>) {
  const [isOpen, setIsOpen] = useState(false);
  const [activePane, setActivePane] = useState<'start' | 'end'>('start');
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const cls = (suffix: string) => `${classPrefix}__${suffix}`;
  const coords = useFloatingPosition(isOpen, triggerRef, dropdownRef);
  const hasValue = startValue.length > 0 || endValue.length > 0;

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

  const rangeLabel = hasValue
    ? `${formatDisplay(startValue) || '…'} — ${formatDisplay(endValue) || '…'}`
    : iconAriaLabel;

  const dropdownPanel = isOpen ? createPortal(
    <div
      ref={dropdownRef}
      className={`${cls('dropdown')} ${cls('dropdown--floating')} ${cls('dropdown--range')}${coords ? ` ${cls('dropdown--positioned')}` : ''}`}
      role="dialog"
      aria-label="Calendario de rango"
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
      <div className={cls('range-tabs')}>
        <button
          type="button"
          className={`${cls('range-tab')}${activePane === 'start' ? ` ${cls('range-tab--active')}` : ''}`}
          onClick={() => setActivePane('start')}
        >
          Desde
          {startValue && (
            <span className={cls('range-tab-value')}>{formatDisplay(startValue)}</span>
          )}
        </button>
        <button
          type="button"
          className={`${cls('range-tab')}${activePane === 'end' ? ` ${cls('range-tab--active')}` : ''}`}
          onClick={() => setActivePane('end')}
        >
          Hasta
          {endValue && (
            <span className={cls('range-tab-value')}>{formatDisplay(endValue)}</span>
          )}
        </button>
      </div>

      {activePane === 'start' ? (
        <CalendarPanel
          value={startValue}
          onChange={onStartChange}
          min={min}
          max={endValue || max}
          classPrefix={classPrefix}
          showTodayButton={!startValue}
          rangeStart={startValue}
          rangeEnd={endValue}
        />
      ) : (
        <CalendarPanel
          value={endValue}
          onChange={onEndChange}
          min={startValue || min}
          max={max}
          classPrefix={classPrefix}
          showTodayButton={!endValue}
          rangeStart={startValue}
          rangeEnd={endValue}
        />
      )}
    </div>,
    document.body,
  ) : null;

  return (
    <div
      className={`${cls('calendar-container')} ${cls('calendar-container--icon')}`}
      ref={containerRef}
    >
      <button
        ref={triggerRef}
        type="button"
        className={`${cls('icon-trigger')}${hasValue ? ` ${cls('icon-trigger--has-value')}` : ''}${isOpen ? ` ${cls('icon-trigger--open')}` : ''}`}
        disabled={disabled}
        onClick={toggle}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggle();
          }
        }}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        aria-label={rangeLabel}
      >
        <CalendarIcon size={18} />
        {hasValue && (
          <span className={cls('icon-trigger-badge')} aria-hidden="true" />
        )}
      </button>

      {dropdownPanel}
    </div>
  );
}
