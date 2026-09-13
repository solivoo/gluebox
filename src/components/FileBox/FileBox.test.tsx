/** @vitest-environment happy-dom */

import { createElement, act } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { FileBox, FileUploader } from './FileBox';

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

describe('FileBox / FileUploader drag & drop', () => {
  it('exporta FileUploader como alias de FileBox', () => {
    expect(FileUploader).toBe(FileBox);
  });

  it('permite arrastrar y soltar un archivo en modo dropzone', () => {
    const onChange = vi.fn();
    const container = mount(
      createElement(FileBox, {
        displayMode: 'dropzone',
        onChange,
      }),
    );

    const control = container.querySelector('.glb-filebox__control');
    expect(control).not.toBeNull();

    const testFile = new File(['dummy content'], 'documento.pdf', { type: 'application/pdf' });
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(testFile);

    const dragEnterEvt = new DragEvent('dragenter', { bubbles: true, cancelable: true });
    Object.defineProperty(dragEnterEvt, 'dataTransfer', { value: dataTransfer });

    act(() => {
      control?.dispatchEvent(dragEnterEvt);
    });

    const rootEl = container.querySelector('.glb-filebox');
    expect(rootEl?.classList.contains('glb-filebox--dragging')).toBe(true);

    const dragOverEvt = new DragEvent('dragover', { bubbles: true, cancelable: true });
    Object.defineProperty(dragOverEvt, 'dataTransfer', { value: dataTransfer });

    act(() => {
      control?.dispatchEvent(dragOverEvt);
    });

    const dropEvt = new DragEvent('drop', { bubbles: true, cancelable: true });
    Object.defineProperty(dropEvt, 'dataTransfer', { value: dataTransfer });

    act(() => {
      control?.dispatchEvent(dropEvt);
    });

    expect(rootEl?.classList.contains('glb-filebox--dragging')).toBe(false);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith([testFile]);

    const fileItem = container.querySelector('.glb-filebox__item-name');
    expect(fileItem?.textContent).toBe('documento.pdf');
  });

  it('permite arrastrar y soltar en modo field', () => {
    const onChange = vi.fn();
    const container = mount(
      createElement(FileBox, {
        displayMode: 'field',
        onChange,
      }),
    );

    const control = container.querySelector('.glb-filebox__control');
    expect(control).not.toBeNull();

    const testFile = new File(['image'], 'foto.png', { type: 'image/png' });
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(testFile);

    const dropEvt = new DragEvent('drop', { bubbles: true, cancelable: true });
    Object.defineProperty(dropEvt, 'dataTransfer', { value: dataTransfer });

    act(() => {
      control?.dispatchEvent(dropEvt);
    });

    expect(onChange).toHaveBeenCalledWith([testFile]);
    const filename = container.querySelector('.glb-filebox__filename');
    expect(filename?.textContent).toBe('foto.png');
  });

  it('no acepta archivos arrastrados si disabled=true', () => {
    const onChange = vi.fn();
    const container = mount(
      createElement(FileBox, {
        disabled: true,
        displayMode: 'dropzone',
        onChange,
      }),
    );

    const control = container.querySelector('.glb-filebox__control');
    const testFile = new File(['text'], 'test.txt', { type: 'text/plain' });
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(testFile);

    const dropEvt = new DragEvent('drop', { bubbles: true, cancelable: true });
    Object.defineProperty(dropEvt, 'dataTransfer', { value: dataTransfer });

    act(() => {
      control?.dispatchEvent(dropEvt);
    });

    expect(onChange).not.toHaveBeenCalled();
  });
});
