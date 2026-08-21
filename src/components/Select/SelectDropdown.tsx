import type { CSSProperties, RefObject } from 'react';
import { createPortal } from 'react-dom';
import { useFloatingPosition } from '@/shared/useFloatingPosition';
import type { SelectOption, SelectSize, SelectVariant } from './type/Select.types';

interface SelectDropdownProps {
  isOpen: boolean;
  selectId: string;
  label?: string;
  options: SelectOption[];
  selectedValue: string;
  highlightedIndex: number;
  variant: SelectVariant;
  size: SelectSize;
  themeStyle?: CSSProperties;
  triggerRef: RefObject<HTMLElement | null>;
  dropdownRef: RefObject<HTMLDivElement | null>;
  optionRefs: RefObject<Map<number, HTMLDivElement>>;
  onSelect: (option: SelectOption) => void;
  onHighlight: (index: number) => void;
}

export function SelectDropdown({
  isOpen,
  selectId,
  label,
  options,
  selectedValue,
  highlightedIndex,
  variant,
  size,
  themeStyle,
  triggerRef,
  dropdownRef,
  optionRefs,
  onSelect,
  onHighlight,
}: Readonly<SelectDropdownProps>) {
  const coords = useFloatingPosition(isOpen, triggerRef, dropdownRef);

  if (!isOpen) return null;

  return createPortal(
    <div
      ref={dropdownRef}
      id={`${selectId}-dropdown`}
      className={[
        'glb-select',
        `glb-select--${variant}`,
        `glb-select--${size}`,
        'glb-select__dropdown',
        'glb-select__dropdown--floating',
        coords && 'glb-select__dropdown--positioned',
      ]
        .filter(Boolean)
        .join(' ')}
      role="listbox"
      aria-label={typeof label === 'string' ? label : 'Opciones'}
      style={{
        ...(themeStyle ?? {}),
        position: 'fixed',
        top: coords?.top ?? -9999,
        left: coords?.left ?? -9999,
        minWidth: coords?.minWidth,
        maxHeight: coords?.maxHeight,
        overflowY: coords?.maxHeight ? 'auto' : undefined,
        visibility: coords ? 'visible' : 'hidden',
        zIndex: 10000,
      }}
    >
      {options.map((option, index) => {
        const isSelected = option.value === selectedValue;
        const isHighlighted = index === highlightedIndex;
        const isDisabled = option.disabled;

        return (
          <div
            key={option.value}
            ref={(el) => {
              if (el) optionRefs.current.set(index, el);
              else optionRefs.current.delete(index);
            }}
            className={[
              'glb-select__option',
              isSelected && 'glb-select__option--selected',
              isHighlighted && 'glb-select__option--highlighted',
              isDisabled && 'glb-select__option--disabled',
            ]
              .filter(Boolean)
              .join(' ')}
            role="option"
            aria-selected={isSelected}
            aria-disabled={isDisabled}
            onClick={() => onSelect(option)}
            onMouseEnter={() => onHighlight(index)}
          >
            {option.label}
          </div>
        );
      })}
    </div>,
    document.body,
  );
}
