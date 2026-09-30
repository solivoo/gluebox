/** @vitest-environment happy-dom */

import { createElement, act } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { FileBox } from './FileBox';

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

const TILE_WIDTH = 100;
const TILE_HEIGHT = 80;

function rectAt(index: number): DOMRect {
  return {
    left: index * TILE_WIDTH,
    right: (index + 1) * TILE_WIDTH,
    top: 0,
    bottom: TILE_HEIGHT,
    width: TILE_WIDTH,
    height: TILE_HEIGHT,
    x: index * TILE_WIDTH,
    y: 0,
    toJSON: () => ({}),
  } as DOMRect;
}

/** Simula el layout horizontal del strip con rects según el orden actual del DOM. */
function mockStripLayout(container: HTMLDivElement): HTMLElement[] {
  const strip = container.querySelector('.glb-filebox__thumb-strip');
  expect(strip).not.toBeNull();
  const tiles = Array.from(
    (strip as HTMLElement).querySelectorAll<HTMLElement>('[data-file-index]'),
  );
  tiles.forEach((tile, index) => {
    (tile as HTMLElement & { getBoundingClientRect: () => DOMRect }).getBoundingClientRect =
      () => rectAt(index);
  });
  return tiles;
}

function pointerEvent(
  type: string,
  clientX: number,
  clientY = TILE_HEIGHT / 2,
  pointerId = 1,
  pointerType = 'touch',
): Event {
  const event = new Event(type, { bubbles: true, cancelable: true });
  Object.defineProperties(event, {
    clientX: { value: clientX },
    clientY: { value: clientY },
    pointerId: { value: pointerId },
    pointerType: { value: pointerType },
    button: { value: 0 },
  });
  return event;
}

function makeFile(name: string, type = 'image/png'): File {
  return new File(['content'], name, { type });
}

function fileNames(container: HTMLDivElement): string[] {
  return Array.from(
    container.querySelectorAll('.glb-filebox__thumb-img, .glb-filebox__thumb-fallback'),
  ).map((el) => el.getAttribute('alt') ?? el.textContent ?? '');
}

describe('FileBox reorderable', () => {
  beforeAll(() => {
    if (typeof URL !== 'undefined') {
      Object.defineProperty(URL, 'createObjectURL', {
        configurable: true,
        value: vi.fn(() => 'blob:mock'),
      });
      Object.defineProperty(URL, 'revokeObjectURL', {
        configurable: true,
        value: vi.fn(),
      });
    }
  });

  it('renderiza el strip con miniaturas y el tile "+" al final', () => {
    const container = mount(
      createElement(FileBox, {
        reorderable: true,
        defaultValue: [makeFile('a.png'), makeFile('b.png')],
      }),
    );

    const tiles = container.querySelectorAll('[data-file-index]');
    expect(tiles.length).toBe(2);

    const images = container.querySelectorAll('.glb-filebox__thumb-img');
    expect(images.length).toBe(2);
    expect((images[0] as HTMLImageElement).getAttribute('src')).toBe('blob:mock');
    expect((images[0] as HTMLImageElement).getAttribute('alt')).toBe('a.png');

    const addButton = container.querySelector('.glb-filebox__thumb-add');
    expect(addButton).not.toBeNull();
  });

  it('muestra solo el tile "+" cuando no hay archivos', () => {
    const container = mount(createElement(FileBox, { reorderable: true }));

    const strip = container.querySelector('.glb-filebox__thumb-strip');
    expect(strip).not.toBeNull();
    expect(container.querySelectorAll('[data-file-index]').length).toBe(0);
    expect(container.querySelector('.glb-filebox__thumb-add')).not.toBeNull();
  });

  it('usa fallback con la extensión para archivos que no son imágenes', () => {
    const container = mount(
      createElement(FileBox, {
        reorderable: true,
        defaultValue: [makeFile('documento.pdf', 'application/pdf')],
      }),
    );

    expect(container.querySelector('.glb-filebox__thumb-img')).toBeNull();
    expect(container.querySelector('.glb-filebox__thumb-fallback')?.textContent).toBe('PDF');
  });

  it('reordena con pointer drag (click sostenido / touch)', () => {
    const onChange = vi.fn();
    const container = mount(
      createElement(FileBox, {
        reorderable: true,
        defaultValue: [makeFile('a.png'), makeFile('b.png'), makeFile('c.png')],
        onChange,
      }),
    );

    const tiles = mockStripLayout(container);
    expect(fileNames(container)).toEqual(['a.png', 'b.png', 'c.png']);

    // pointerdown en el primer tile
    act(() => {
      tiles[0].dispatchEvent(pointerEvent('pointerdown', 10));
    });

    // primer movimiento: activa el drag (cruza el umbral)
    act(() => {
      tiles[0].dispatchEvent(pointerEvent('pointermove', 40));
    });
    expect(onChange).not.toHaveBeenCalled();

    // segundo movimiento: cruza el punto medio del segundo tile (target = 1)
    mockStripLayout(container);
    act(() => {
      tiles[0].dispatchEvent(pointerEvent('pointermove', 160));
    });

    // sin commit hasta soltar
    expect(onChange).not.toHaveBeenCalled();

    act(() => {
      tiles[0].dispatchEvent(pointerEvent('pointerup', 160));
    });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(fileNames(container)).toEqual(['b.png', 'a.png', 'c.png']);
  });

  it('reordena de derecha a izquierda arrastrando el último tile al inicio', () => {
    const onChange = vi.fn();
    const container = mount(
      createElement(FileBox, {
        reorderable: true,
        defaultValue: [makeFile('a.png'), makeFile('b.png'), makeFile('c.png')],
        onChange,
      }),
    );

    const tiles = mockStripLayout(container);

    act(() => {
      tiles[2].dispatchEvent(pointerEvent('pointerdown', 210));
    });
    act(() => {
      tiles[2].dispatchEvent(pointerEvent('pointermove', 180));
    });

    mockStripLayout(container);
    act(() => {
      tiles[2].dispatchEvent(pointerEvent('pointermove', 40));
    });

    mockStripLayout(container);
    act(() => {
      tiles[2].dispatchEvent(pointerEvent('pointerup', 40));
    });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(fileNames(container)).toEqual(['c.png', 'a.png', 'b.png']);
  });

  it('mueve el primer tile al final arrastrando más allá de la lista', () => {
    const onChange = vi.fn();
    const container = mount(
      createElement(FileBox, {
        reorderable: true,
        defaultValue: [makeFile('a.png'), makeFile('b.png'), makeFile('c.png')],
        onChange,
      }),
    );

    const tiles = mockStripLayout(container);

    act(() => {
      tiles[0].dispatchEvent(pointerEvent('pointerdown', 10));
      tiles[0].dispatchEvent(pointerEvent('pointermove', 40));
    });

    mockStripLayout(container);
    act(() => {
      tiles[0].dispatchEvent(pointerEvent('pointermove', 3 * TILE_WIDTH + 10));
    });

    mockStripLayout(container);
    act(() => {
      tiles[0].dispatchEvent(pointerEvent('pointerup', 3 * TILE_WIDTH + 10));
    });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(fileNames(container)).toEqual(['b.png', 'c.png', 'a.png']);
  });

  it('reordena con teclado (ArrowLeft / ArrowRight)', () => {
    const onChange = vi.fn();
    const container = mount(
      createElement(FileBox, {
        reorderable: true,
        defaultValue: [makeFile('a.png'), makeFile('b.png')],
        onChange,
      }),
    );

    const firstTiles = container.querySelectorAll('[data-file-index]');
    expect(firstTiles[0].getAttribute('tabindex')).toBe('0');

    act(() => {
      firstTiles[0].dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true, cancelable: true }),
      );
    });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(fileNames(container)).toEqual(['b.png', 'a.png']);

    const secondTiles = container.querySelectorAll('[data-file-index]');
    act(() => {
      secondTiles[1].dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true, cancelable: true }),
      );
    });

    expect(onChange).toHaveBeenCalledTimes(2);
    expect(fileNames(container)).toEqual(['a.png', 'b.png']);
  });

  it('oculta el campo de resumen y el botón "Elegir archivo" cuando reorderable', () => {
    const container = mount(
      createElement(FileBox, {
        reorderable: true,
        label: 'Galería',
        defaultValue: [makeFile('a.png')],
      }),
    );

    expect(container.querySelector('.glb-filebox__field')).toBeNull();
    expect(container.querySelector('.glb-filebox__browse')).toBeNull();
    expect(container.querySelector('.glb-filebox__filename')).toBeNull();
    expect(container.querySelector('.glb-filebox__label')?.textContent).toBe('Galería');
  });

  it('muestra un fantasma flotante que sigue al puntero durante el drag', () => {
    const container = mount(
      createElement(FileBox, {
        reorderable: true,
        defaultValue: [makeFile('a.png'), makeFile('b.png')],
      }),
    );

    const tiles = mockStripLayout(container);

    act(() => {
      tiles[0].dispatchEvent(pointerEvent('pointerdown', 10, 10));
    });
    expect(document.querySelector('.glb-filebox__thumb-ghost')).toBeNull();

    act(() => {
      tiles[0].dispatchEvent(pointerEvent('pointermove', 40, 10));
    });

    const ghost = document.querySelector('.glb-filebox__thumb-ghost');
    expect(ghost).not.toBeNull();
    expect((ghost as HTMLElement).style.transform).toContain('translate3d(30px');

    const sourceTile = container.querySelector('.glb-filebox__thumb--source');
    expect(sourceTile).not.toBeNull();

    act(() => {
      tiles[0].dispatchEvent(pointerEvent('pointerup', 40, 10));
    });

    expect(document.querySelector('.glb-filebox__thumb-ghost')).toBeNull();
    expect(container.querySelector('.glb-filebox__thumb--source')).toBeNull();
  });

  it('cancela el drag con Escape sin emitir cambios', () => {
    const onChange = vi.fn();
    const container = mount(
      createElement(FileBox, {
        reorderable: true,
        defaultValue: [makeFile('a.png'), makeFile('b.png'), makeFile('c.png')],
        onChange,
      }),
    );

    const tiles = mockStripLayout(container);

    act(() => {
      tiles[0].dispatchEvent(pointerEvent('pointerdown', 10));
      tiles[0].dispatchEvent(pointerEvent('pointermove', 40));
    });

    mockStripLayout(container);
    act(() => {
      tiles[0].dispatchEvent(pointerEvent('pointermove', 160));
    });
    expect(container.querySelector('.glb-filebox__thumb--source')).not.toBeNull();

    act(() => {
      document.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }),
      );
    });

    expect(onChange).not.toHaveBeenCalled();
    expect(document.querySelector('.glb-filebox__thumb-ghost')).toBeNull();
    expect(container.querySelector('.glb-filebox__thumb--source')).toBeNull();
    expect(fileNames(container)).toEqual(['a.png', 'b.png', 'c.png']);
  });

  it('muestra el contador N/maxFiles y lo actualiza al quitar', () => {
    const container = mount(
      createElement(FileBox, {
        reorderable: true,
        maxFiles: 3,
        defaultValue: [makeFile('a.png'), makeFile('b.png')],
      }),
    );

    expect(container.querySelector('.glb-filebox__thumb-counter')?.textContent).toBe('2/3');

    const removeButton = container.querySelector('.glb-filebox__thumb-remove');
    act(() => {
      (removeButton as HTMLButtonElement).dispatchEvent(
        new MouseEvent('click', { bubbles: true, cancelable: true }),
      );
    });

    expect(container.querySelector('.glb-filebox__thumb-counter')?.textContent).toBe('1/3');
  });

  it('no muestra contador cuando no hay maxFiles', () => {
    const container = mount(
      createElement(FileBox, {
        reorderable: true,
        defaultValue: [makeFile('a.png')],
      }),
    );

    expect(container.querySelector('.glb-filebox__thumb-counter')).toBeNull();
  });

  it('quita un archivo desde el botón × de la miniatura', () => {
    const onChange = vi.fn();
    const container = mount(
      createElement(FileBox, {
        reorderable: true,
        defaultValue: [makeFile('a.png'), makeFile('b.png')],
        onChange,
      }),
    );

    const removeButton = container.querySelector('.glb-filebox__thumb-remove');
    expect(removeButton).not.toBeNull();

    act(() => {
      (removeButton as HTMLButtonElement).dispatchEvent(
        new MouseEvent('click', { bubbles: true, cancelable: true }),
      );
    });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(fileNames(container)).toEqual(['b.png']);
  });

  it('oculta el tile "+" cuando se alcanza maxFiles', () => {
    const container = mount(
      createElement(FileBox, {
        reorderable: true,
        maxFiles: 2,
        defaultValue: [makeFile('a.png'), makeFile('b.png')],
      }),
    );

    expect(container.querySelector('.glb-filebox__thumb-add')).toBeNull();
  });

  it('deshabilita drag, quitar y "+" cuando disabled=true', () => {
    const onChange = vi.fn();
    const container = mount(
      createElement(FileBox, {
        reorderable: true,
        disabled: true,
        defaultValue: [makeFile('a.png'), makeFile('b.png')],
        onChange,
      }),
    );

    expect(container.querySelector('.glb-filebox__thumb-add')).toBeNull();
    expect(container.querySelector('.glb-filebox__thumb-remove')).toBeNull();
    expect(container.querySelector('[data-file-index]')?.getAttribute('tabindex')).toBe('-1');

    const tiles = mockStripLayout(container);
    act(() => {
      tiles[0].dispatchEvent(pointerEvent('pointerdown', 10));
      tiles[0].dispatchEvent(pointerEvent('pointermove', 150));
      tiles[0].dispatchEvent(pointerEvent('pointerup', 150));
    });

    expect(onChange).not.toHaveBeenCalled();
  });
});
