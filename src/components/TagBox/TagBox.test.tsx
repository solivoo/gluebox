/** @vitest-environment happy-dom */

import { createElement, act } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { TagBox } from './TagBox';

let root: Root | null = null;
let host: HTMLDivElement | null = null;

function mount(node: ReturnType<typeof createElement>): HTMLDivElement {
  host = document.createElement('div');
  document.body.appendChild(host);
  root = createRoot(host);
  act(() => {
    root?.render(node);
  });
  return host;
}

function cleanup(): void {
  act(() => {
    root?.unmount();
  });
  host?.remove();
  root = null;
  host = null;
  document.body.replaceChildren();
}

afterEach(cleanup);

function inputOf(container: HTMLDivElement): HTMLInputElement {
  const input = container.querySelector('.glb-tagbox__input');
  expect(input).not.toBeNull();
  return input as HTMLInputElement;
}

function typeInto(input: HTMLInputElement, value: string): void {
  const setter = Object.getOwnPropertyDescriptor(
    window.HTMLInputElement.prototype,
    'value',
  )?.set;
  setter?.call(input, value);
  input.dispatchEvent(new Event('input', { bubbles: true }));
}

function keydown(input: HTMLInputElement, key: string): void {
  input.dispatchEvent(
    new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true }),
  );
}

function tagLabels(container: HTMLDivElement): string[] {
  return Array.from(container.querySelectorAll('.glb-tagbox__tag-text')).map(
    (el) => el.textContent ?? '',
  );
}

describe('TagBox', () => {
  it('renderiza los tags de defaultValue en modo no controlado', () => {
    const container = mount(
      createElement(TagBox, { defaultValue: ['uno', 'dos'] }),
    );

    expect(tagLabels(container)).toEqual(['uno', 'dos']);
  });

  it('agrega un tag con Enter y limpia el draft', () => {
    const onChange = vi.fn();
    const container = mount(createElement(TagBox, { onChange }));
    const input = inputOf(container);

    act(() => {
      typeInto(input, 'react');
      keydown(input, 'Enter');
    });

    expect(onChange).toHaveBeenCalledWith(['react']);
    expect(tagLabels(container)).toEqual(['react']);
    expect(input.value).toBe('');
  });

  it('agrega un tag con coma', () => {
    const container = mount(createElement(TagBox, {}));
    const input = inputOf(container);

    act(() => {
      typeInto(input, 'css');
      keydown(input, ',');
    });

    expect(tagLabels(container)).toEqual(['css']);
  });

  it('recorta espacios y no agrega tags vacíos', () => {
    const onChange = vi.fn();
    const container = mount(createElement(TagBox, { onChange }));
    const input = inputOf(container);

    act(() => {
      typeInto(input, '   ');
      keydown(input, 'Enter');
    });
    expect(onChange).not.toHaveBeenCalled();

    act(() => {
      typeInto(input, '  hooks  ');
      keydown(input, 'Enter');
    });
    expect(onChange).toHaveBeenCalledWith(['hooks']);
    expect(tagLabels(container)).toEqual(['hooks']);
  });

  it('previene duplicados (case-insensitive) por defecto', () => {
    const onChange = vi.fn();
    const container = mount(
      createElement(TagBox, { defaultValue: ['React'], onChange }),
    );
    const input = inputOf(container);

    act(() => {
      typeInto(input, 'react');
      keydown(input, 'Enter');
    });

    expect(onChange).not.toHaveBeenCalled();
    expect(tagLabels(container)).toEqual(['React']);
  });

  it('permite duplicados con allowDuplicates', () => {
    const onChange = vi.fn();
    const container = mount(
      createElement(TagBox, {
        defaultValue: ['React'],
        allowDuplicates: true,
        onChange,
      }),
    );
    const input = inputOf(container);

    act(() => {
      typeInto(input, 'React');
      keydown(input, 'Enter');
    });

    expect(onChange).toHaveBeenCalledWith(['React', 'React']);
    expect(tagLabels(container)).toEqual(['React', 'React']);
  });

  it('elimina un tag con el botón de quitar', () => {
    const onChange = vi.fn();
    const container = mount(
      createElement(TagBox, { defaultValue: ['uno', 'dos'], onChange }),
    );

    const removeButton = container.querySelector('.glb-tagbox__tag-remove');
    expect(removeButton).not.toBeNull();

    act(() => {
      (removeButton as HTMLButtonElement).dispatchEvent(
        new MouseEvent('click', { bubbles: true, cancelable: true }),
      );
    });

    expect(onChange).toHaveBeenCalledWith(['dos']);
    expect(tagLabels(container)).toEqual(['dos']);
  });

  it('elimina el último tag con Backspace cuando el input está vacío', () => {
    const onChange = vi.fn();
    const container = mount(
      createElement(TagBox, { defaultValue: ['uno', 'dos'], onChange }),
    );
    const input = inputOf(container);

    act(() => {
      keydown(input, 'Backspace');
    });

    expect(onChange).toHaveBeenCalledWith(['uno']);
    expect(tagLabels(container)).toEqual(['uno']);
  });

  it('respeta maxTags', () => {
    const onChange = vi.fn();
    const container = mount(
      createElement(TagBox, { defaultValue: ['uno'], maxTags: 1, onChange }),
    );
    const input = inputOf(container);

    act(() => {
      typeInto(input, 'dos');
      keydown(input, 'Enter');
    });

    expect(onChange).not.toHaveBeenCalled();
    expect(tagLabels(container)).toEqual(['uno']);
  });

  it('funciona en modo controlado (value + onChange)', () => {
    const onChange = vi.fn();
    const container = mount(
      createElement(TagBox, { value: ['uno'], onChange }),
    );
    const input = inputOf(container);

    act(() => {
      typeInto(input, 'dos');
      keydown(input, 'Enter');
    });

    expect(onChange).toHaveBeenCalledWith(['uno', 'dos']);
    expect(tagLabels(container)).toEqual(['uno']);
  });

  it('limpia todos los tags con el botón de limpiar', () => {
    const onChange = vi.fn();
    const container = mount(
      createElement(TagBox, {
        defaultValue: ['uno', 'dos'],
        showClearButton: true,
        onChange,
      }),
    );

    const clearButton = container.querySelector('.glb-tagbox__clear');
    expect(clearButton).not.toBeNull();

    act(() => {
      (clearButton as HTMLButtonElement).dispatchEvent(
        new MouseEvent('click', { bubbles: true, cancelable: true }),
      );
    });

    expect(onChange).toHaveBeenCalledWith([]);
    expect(tagLabels(container)).toEqual([]);
  });

  it('no agrega tags si disabled=true', () => {
    const onChange = vi.fn();
    const container = mount(
      createElement(TagBox, { disabled: true, onChange }),
    );
    const input = inputOf(container);
    expect(input.disabled).toBe(true);

    act(() => {
      typeInto(input, 'react');
      keydown(input, 'Enter');
    });

    expect(onChange).not.toHaveBeenCalled();
    expect(tagLabels(container)).toEqual([]);
  });

  it('expone label, helper y estado de error', () => {
    const container = mount(
      createElement(TagBox, {
        label: 'Etiquetas',
        helperText: 'Ayuda',
        error: true,
        errorMessage: 'Obligatorio',
      }),
    );

    expect(container.querySelector('.glb-tagbox__label')?.textContent).toBe('Etiquetas');
    expect(container.querySelector('.glb-tagbox--error')).not.toBeNull();
    expect(container.querySelector('.glb-tagbox__helper--error')?.textContent).toBe('Obligatorio');
    expect(container.querySelector('.glb-tagbox__input')?.getAttribute('aria-invalid')).toBe('true');
  });
});
