/** @vitest-environment happy-dom */

import { createElement, act } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, describe, expect, it } from 'vitest';
import { Select } from './Select';
import type { SelectOption } from './type/Select.types';

const options: SelectOption[] = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'svelte', label: 'Svelte', disabled: true },
];

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

function triggerButton(container: HTMLElement): HTMLButtonElement {
  const button = container.querySelector('[role="combobox"]');
  if (!(button instanceof HTMLButtonElement)) {
    throw new Error('No se encontró el trigger del Select');
  }
  return button;
}

describe('Select dropdown portal', () => {
  it('el listbox vive en document.body aunque el ancestro tenga overflow hidden', () => {
    const container = mount(
      createElement(
        'div',
        { className: 'overflow-host', style: { overflow: 'hidden', height: '40px', width: '200px' } },
        createElement(Select, { options, placeholder: 'Elegir' }),
      ),
    );

    act(() => {
      triggerButton(container).click();
    });

    const overflowHost = container.querySelector('.overflow-host');
    const listbox = document.querySelector('[role="listbox"]');
    expect(listbox).toBeTruthy();
    expect(overflowHost?.contains(listbox)).toBe(false);
    expect(document.body.contains(listbox)).toBe(true);
  });

  it('el listbox es clickeable con overflow-x auto y dispara onChange', () => {
    let value = '';
    const container = mount(
      createElement(
        'div',
        { style: { overflowX: 'auto', width: '120px' } },
        createElement(Select, {
          options,
          placeholder: 'Elegir',
          onChange: (next: string) => {
            value = next;
          },
        }),
      ),
    );

    act(() => {
      triggerButton(container).click();
    });

    const vue = document.querySelector('[role="option"]');
    const vueOption = Array.from(document.querySelectorAll('[role="option"]')).find(
      (el) => el.textContent === 'Vue',
    );
    expect(vue).toBeTruthy();
    expect(vueOption).toBeTruthy();

    act(() => {
      vueOption?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(value).toBe('vue');
    expect(document.querySelector('[role="listbox"]')).toBeNull();
  });

  it('ArrowDown + Enter selecciona la opción resaltada', () => {
    let value = '';
    const container = mount(
      createElement(Select, {
        options,
        placeholder: 'Elegir',
        onChange: (next: string) => {
          value = next;
        },
      }),
    );

    const trigger = triggerButton(container);

    act(() => {
      trigger.focus();
      trigger.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, cancelable: true }),
      );
    });

    expect(document.querySelector('[role="listbox"]')).toBeTruthy();

    act(() => {
      trigger.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true }),
      );
    });

    expect(value).toBe('react');
  });

  it('Escape cierra el menú y restaura el foco al trigger', () => {
    const container = mount(createElement(Select, { options, placeholder: 'Elegir' }));
    const trigger = triggerButton(container);

    act(() => {
      trigger.focus();
      trigger.click();
    });
    expect(document.querySelector('[role="listbox"]')).toBeTruthy();

    act(() => {
      trigger.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true }),
      );
    });

    expect(document.querySelector('[role="listbox"]')).toBeNull();
    expect(document.activeElement).toBe(trigger);
  });
});
