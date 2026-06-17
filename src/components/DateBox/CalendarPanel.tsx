import { useState, useEffect, useMemo, useCallback } from 'react';
import {
  DAYS_HEADER,
  MONTHS,
  getDayRangeRole,
  getNormalizedDateRange,
  isDateInRange,
  isSameDay,
  parseDate,
  todayAtMidnight,
  toDateStr,
} from './dateUtils';

interface CalendarPanelProps {
  value: string;
  onChange: (dateStr: string) => void;
  min?: string;
  max?: string;
  classPrefix?: string;
  showTodayButton?: boolean;
  onSelect?: () => void;
  /** Inicio del rango a resaltar (YYYY-MM-DD) */
  rangeStart?: string;
  /** Fin del rango a resaltar (YYYY-MM-DD) */
  rangeEnd?: string;
}

export function CalendarPanel({
  value,
  onChange,
  min,
  max,
  classPrefix = 'glb-datebox',
  showTodayButton = true,
  onSelect,
  rangeStart,
  rangeEnd,
}: Readonly<CalendarPanelProps>) {
  const [viewDate, setViewDate] = useState(() => parseDate(value) ?? new Date());
  const cls = (suffix: string) => `${classPrefix}__${suffix}`;

  const selectedDate = parseDate(value);
  const today = useMemo(() => todayAtMidnight(), []);
  const highlightRange = useMemo(
    () => getNormalizedDateRange(rangeStart, rangeEnd),
    [rangeStart, rangeEnd],
  );

  useEffect(() => {
    const d = parseDate(value);
    if (d) setViewDate(d);
  }, [value]);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const firstOfMonth = new Date(year, month, 1);
  let startDow = firstOfMonth.getDay() - 1;
  if (startDow < 0) startDow = 6;

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevMonthDays = new Date(year, month, 0).getDate();

  const prevFill: number[] = [];
  for (let i = startDow - 1; i >= 0; i--) {
    prevFill.push(prevMonthDays - i);
  }

  const currentDays: number[] = [];
  for (let i = 1; i <= daysInMonth; i++) {
    currentDays.push(i);
  }

  const totalCells = prevFill.length + currentDays.length;
  const nextFill: number[] = [];
  const needed = totalCells <= 35 ? 35 - totalCells : 42 - totalCells;
  for (let i = 1; i <= needed; i++) {
    nextFill.push(i);
  }

  const selectDay = useCallback((day: number, isCurrentMonth: boolean) => {
    let targetMonth = month;
    let targetYear = year;

    if (!isCurrentMonth) {
      if (day > 15) {
        targetMonth = month - 1;
        if (targetMonth < 0) { targetMonth = 11; targetYear -= 1; }
      } else {
        targetMonth = month + 1;
        if (targetMonth > 11) { targetMonth = 0; targetYear += 1; }
      }
    }

    const newDate = new Date(targetYear, targetMonth, day);
    if (!isDateInRange(newDate, min, max)) return;

    onChange(toDateStr(newDate));
    onSelect?.();
  }, [month, year, min, max, onChange, onSelect]);

  const buildDayClassName = useCallback((
    date: Date,
    isCurrentMonth: boolean,
    isActiveField: boolean,
    disabledDay: boolean,
    rangeRole: ReturnType<typeof getDayRangeRole>,
  ) => {
    let className = cls('day');
    if (!isCurrentMonth) className += ` ${cls('day--other-month')}`;
    if (isSameDay(date, today)) className += ` ${cls('day--today')}`;

    const hasRange = rangeRole !== null;

    if (hasRange) {
      if (rangeRole === 'single') {
        className += ` ${cls('day--range-single')} ${cls('day--range-endpoint')}`;
      } else if (rangeRole === 'start') {
        className += ` ${cls('day--range-start')} ${cls('day--range-endpoint')}`;
      } else if (rangeRole === 'end') {
        className += ` ${cls('day--range-end')} ${cls('day--range-endpoint')}`;
      } else if (rangeRole === 'middle') {
        className += ` ${cls('day--in-range')}`;
      }
    } else if (isActiveField) {
      className += ` ${cls('day--selected')}`;
    }

    if (isActiveField && hasRange) {
      className += ` ${cls('day--active-field')}`;
    }

    if (disabledDay) className += ` ${cls('day--disabled')}`;

    return className;
  }, [cls, today]);

  const renderDay = (
    day: number,
    date: Date,
    isCurrentMonth: boolean,
    key: string,
  ) => {
    const isActiveField = selectedDate ? isSameDay(date, selectedDate) : false;
    const disabledDay = !isDateInRange(date, min, max);
    const rangeRole = getDayRangeRole(date, highlightRange);
    const inRange = rangeRole !== null;

    return (
      <button
        key={key}
        type="button"
        className={buildDayClassName(date, isCurrentMonth, isActiveField, disabledDay, rangeRole)}
        disabled={disabledDay}
        onClick={() => selectDay(day, isCurrentMonth)}
        aria-current={isActiveField || (rangeRole === 'start' || rangeRole === 'end' || rangeRole === 'single') ? 'date' : undefined}
        aria-label={`${day} de ${MONTHS[date.getMonth()]} de ${date.getFullYear()}`}
        data-in-range={inRange || undefined}
      >
        {day}
      </button>
    );
  };

  return (
    <>
      <div className={cls('dropdown-header')}>
        <button
          type="button"
          className={cls('nav-btn')}
          onClick={() => setViewDate(new Date(year, month - 1, 1))}
          aria-label="Mes anterior"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <span className={cls('month-year')}>
          {MONTHS[month]} {year}
        </span>

        <button
          type="button"
          className={cls('nav-btn')}
          onClick={() => setViewDate(new Date(year, month + 1, 1))}
          aria-label="Mes siguiente"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      <div className={cls('day-names')}>
        {DAYS_HEADER.map(d => (
          <span key={d} className={cls('day-name')}>{d}</span>
        ))}
      </div>

      <div className={cls('day-grid')}>
        {prevFill.map(day => renderDay(
          day,
          new Date(year, month - 1, day),
          false,
          `prev-${day}`,
        ))}

        {currentDays.map(day => renderDay(
          day,
          new Date(year, month, day),
          true,
          `curr-${day}`,
        ))}

        {nextFill.map(day => renderDay(
          day,
          new Date(year, month + 1, day),
          false,
          `next-${day}`,
        ))}
      </div>

      {showTodayButton && !selectedDate && (
        <div className={cls('dropdown-footer')}>
          <button
            type="button"
            className={cls('today-btn')}
            onClick={() => {
              const todayStr = toDateStr(today);
              if (isDateInRange(today, min, max)) {
                onChange(todayStr);
                onSelect?.();
              }
            }}
            disabled={!isDateInRange(today, min, max)}
          >
            Hoy
          </button>
        </div>
      )}
    </>
  );
}
