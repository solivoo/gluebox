/** @vitest-environment happy-dom */

import { createElement, act } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Switch } from './Switch';

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
  const input = container.querySelector('.glb-switch__input');
  expect(input).not.toBeNull();
  return input as HTMLInputElement;
}

describe('Switch', () => {
  it('renderiza un checkbox con role switch sin marcar por defecto', () => {
    const container = mount(createElement(Switch, { label: 'Notificaciones' }));
    const input = inputOf(container);

    expect(input.type).toBe('checkbox');
    expect(input.getAttribute('role')).toBe('switch');
    expect(input.checked).toBe(false);
    expect(container.querySelector('.glb-switch__label')?.textContent).toBe(
      'Notificaciones',
    );
  });

  it('alterna el estado no controlado y emite onChange', () => {
    const onChange = vi.fn();
    const container = mount(
      createElement(Switch, { defaultChecked: false, onChange }),
    );
    const input = inputOf(container);

    act(() => {
      input.click();
    });

    expect(onChange).toHaveBeenCalledWith(true);
    expect(inputOf(container).checked).toBe(true);
    expect(container.querySelector('.glb-switch--checked')).not.toBeNull();

    act(() => {
      inputOf(container).click();
    });

    expect(onChange).toHaveBeenLastCalledWith(false);
    expect(inputOf(container).checked).toBe(false);
  });

  it('respeta defaultChecked', () => {
    const container = mount(createElement(Switch, { defaultChecked: true }));
    expect(inputOf(container).checked).toBe(true);
    expect(container.querySelector('.glb-switch--checked')).not.toBeNull();
  });

  it('en modo controlado no muta su estado interno y notifica el cambio', () => {
    const onChange = vi.fn();
    const container = mount(
      createElement(Switch, { checked: false, onChange }),
    );
    const input = inputOf(container);

    act(() => {
      input.click();
    });

    expect(onChange).toHaveBeenCalledWith(true);
    expect(inputOf(container).checked).toBe(false);
    expect(container.querySelector('.glb-switch--checked')).toBeNull();
  });

  it('no emite cambios cuando está deshabilitado', () => {
    const onChange = vi.fn();
    const container = mount(
      createElement(Switch, { disabled: true, onChange }),
    );
    const input = inputOf(container);

    expect(input.disabled).toBe(true);
    act(() => {
      input.click();
    });
    expect(onChange).not.toHaveBeenCalled();
    expect(container.querySelector('.glb-switch--disabled')).not.toBeNull();
  });

  it('bloquea la interacción y muestra spinner en loading', () => {
    const onChange = vi.fn();
    const container = mount(
      createElement(Switch, { loading: true, onChange }),
    );
    const input = inputOf(container);

    expect(input.disabled).toBe(true);
    expect(input.getAttribute('aria-busy')).toBe('true');
    expect(container.querySelector('.glb-switch__loader')).not.toBeNull();

    act(() => {
      input.click();
    });
    expect(onChange).not.toHaveBeenCalled();
  });

  it('aplica la posición de label solicitada', () => {
    const container = mount(
      createElement(Switch, { label: 'Activo', labelPosition: 'top' }),
    );
    expect(container.querySelector('.glb-switch--label-top')).not.toBeNull();
  });

  it('expone helper, error y estados accesibles', () => {
    const container = mount(
      createElement(Switch, {
        label: 'Sync',
        helperText: 'Se sincroniza cada hora',
      }),
    );
    const input = inputOf(container);
    const helperId = input.getAttribute('aria-describedby');
    expect(helperId).toBeTruthy();
    expect(document.getElementById(helperId as string)?.textContent).toBe(
      'Se sincroniza cada hora',
    );
    expect(input.getAttribute('aria-invalid')).toBeNull();

    cleanup();

    const errorContainer = mount(
      createElement(Switch, { errorMessage: 'Campo requerido' }),
    );
    const errorInput = inputOf(errorContainer);
    expect(errorInput.getAttribute('aria-invalid')).toBe('true');
    expect(
      errorContainer.querySelector('.glb-switch__helper')?.textContent,
    ).toBe('Campo requerido');
    expect(errorContainer.querySelector('.glb-switch--error')).not.toBeNull();
  });

  it('propaga props nativas del input', () => {
    const container = mount(
      createElement(Switch, { name: 'activo', required: true }),
    );
    const input = inputOf(container);
    expect(input.name).toBe('activo');
    expect(input.required).toBe(true);
  });
});
