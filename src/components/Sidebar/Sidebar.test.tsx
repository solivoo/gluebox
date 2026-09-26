/** @vitest-environment happy-dom */

import { createElement, type ReactElement, act } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Sidebar } from './Sidebar';
import type { MenuConfig } from './type/menu.types';

let root: Root | null = null;
let host: HTMLDivElement | null = null;

function mount(node: ReactElement): HTMLDivElement {
  host = document.createElement('div');
  document.body.appendChild(host);
  root = createRoot(host);
  act(() => {
    root?.render(node);
  });
  return host;
}

afterEach(() => {
  act(() => {
    root?.unmount();
  });
  root = null;
  host?.remove();
  host = null;
});

describe('Sidebar — módulos bloqueados', () => {
  it('deshabilita, atenúa y muestra candado con tooltip en un módulo bloqueado', () => {
    const onNavigate = vi.fn();
    const menu: MenuConfig = {
      items: [
        {
          id: 'ecommerce',
          label: 'Ecommerce',
          path: '/ecommerce',
          disabled: true,
          locked: true,
          disabledReason: 'Módulo no incluido en tu plan.',
        },
      ],
    };

    const view = mount(
      createElement(Sidebar, { menu, userPermissions: [], onNavigate }),
    );

    const button = view.querySelector<HTMLButtonElement>('.sidebar__link--module');
    expect(button?.disabled).toBe(true);
    expect(button?.getAttribute('aria-disabled')).toBe('true');
    expect(button?.getAttribute('title')).toBe('Módulo no incluido en tu plan.');
    expect(button?.classList.contains('sidebar__link--disabled')).toBe(true);
    expect(view.querySelector('.sidebar__lock')).not.toBeNull();

    act(() => {
      button?.click();
    });
    expect(onNavigate).not.toHaveBeenCalled();
  });

  it('mantiene el label limpio en subítems bloqueados y navega los habilitados', () => {
    const onNavigate = vi.fn();
    const menu: MenuConfig = {
      items: [
        {
          id: 'catalogo',
          label: 'Catálogo',
          children: [
            {
              id: 'items',
              label: 'Ítems',
              path: '/catalogo/items',
              disabled: true,
              locked: true,
              disabledReason: 'Módulo no incluido en tu plan.',
            },
            { id: 'precios', label: 'Gestión de precios', path: '/catalogo/precios' },
          ],
        },
      ],
    };

    const view = mount(
      createElement(Sidebar, {
        menu,
        userPermissions: [],
        onNavigate,
        activePath: '/catalogo/items',
      }),
    );

    const labels = Array.from(view.querySelectorAll('.sidebar__label')).map(
      (node) => node.textContent ?? '',
    );
    expect(labels).toContain('Ítems');
    expect(labels.some((label) => label.includes('Módulo no incluido'))).toBe(false);
    expect(view.querySelectorAll('.sidebar__lock')).toHaveLength(1);

    const locked = Array.from(
      view.querySelectorAll<HTMLButtonElement>('.sidebar__link--option'),
    ).find((button) => button.textContent?.includes('Ítems'));

    act(() => {
      locked?.click();
    });
    expect(onNavigate).not.toHaveBeenCalled();

    const enabled = Array.from(
      view.querySelectorAll<HTMLButtonElement>('.sidebar__link--option'),
    ).find((button) => button.textContent?.includes('Gestión de precios'));

    act(() => {
      enabled?.click();
    });
    expect(onNavigate).toHaveBeenCalledWith('/catalogo/precios');
  });
});
