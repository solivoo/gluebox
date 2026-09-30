/** @vitest-environment happy-dom */

import { act, type ReactNode } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, describe, expect, it } from 'vitest';
import * as matchers from 'vitest-axe/matchers';
import type { AxeMatchers } from 'vitest-axe/matchers';
import { axe } from 'vitest-axe';

declare module 'vitest' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  export interface Assertion<T = any> extends AxeMatchers {}
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface AsymmetricMatchersContaining extends AxeMatchers {}
}

// Suppress act warnings in happy-dom
(globalThis as unknown as { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

// 18 Gluebox Components
import { Button } from '../components/Button/Button';
import { Switch } from '../components/Switch/Switch';
import { CheckButton } from '../components/CheckButton/CheckButton';
import { TextBox } from '../components/TextBox/TextBox';
import { NumberBox } from '../components/NumberBox/NumberBox';
import { TextArea } from '../components/TextArea/TextArea';
import { TagBox } from '../components/TagBox/TagBox';
import { DateBox } from '../components/DateBox/DateBox';
import { RangeDateBox } from '../components/RangeDateBox/RangeDateBox';
import { Select } from '../components/Select/Select';
import { OptionGroup } from '../components/OptionGroup/OptionGroup';
import { FileBox } from '../components/FileBox/FileBox';
import { ColorPicker } from '../components/ColorPicker/ColorPicker';
import { Popup } from '../components/Popup/Popup';
import { Toast } from '../components/Toast/Toast';
import { Sidebar } from '../components/Sidebar/Sidebar';
import { PageActionsMenu } from '../components/PageActionsMenu/PageActionsMenu';
import { DataGrid } from '../components/DataGrid/DataGrid';

expect.extend(matchers);

let root: Root | null = null;
let host: HTMLDivElement | null = null;

function renderIntoDom(node: ReactNode): HTMLDivElement {
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
  host?.remove();
  root = null;
  host = null;
  document.body.replaceChildren();
});

describe('Automated Accessibility Audits (vitest-axe)', () => {
  it('1. Button: cumple estándares WCAG sin violaciones de accesibilidad', async () => {
    const el = renderIntoDom(
      <div>
        <Button variant="primary">Guardar cambios</Button>
        <Button variant="outline" disabled>Cancelar</Button>
        <Button variant="danger" aria-label="Eliminar registro irreversible">Eliminar</Button>
      </div>,
    );
    const results = await axe(el);
    expect(results).toHaveNoViolations();
  });

  it('2. Switch: cumple roles y etiquetas en estados checked, unchecked y disabled', async () => {
    const el = renderIntoDom(
      <div>
        <Switch label="Modo nocturno" checked onChange={() => {}} />
        <Switch label="Notificaciones push" defaultChecked={false} />
        <Switch label="Configuración bloqueada" disabled />
      </div>,
    );
    const results = await axe(el);
    expect(results).toHaveNoViolations();
  });

  it('3. CheckButton: rol checkbox con aria-checked y nombre accesible', async () => {
    const el = renderIntoDom(
      <div>
        <CheckButton checked onChange={() => {}}>Acepto términos y condiciones</CheckButton>
        <CheckButton indeterminate>Selección parcial</CheckButton>
      </div>,
    );
    const results = await axe(el);
    expect(results).toHaveNoViolations();
  });

  it('4. TextBox: asociación semántica de label, input, helperText y error', async () => {
    const el = renderIntoDom(
      <div>
        <TextBox
          label="Correo electrónico"
          placeholder="ejemplo@empresa.com"
          helperText="Nunca compartiremos tu información"
          showClearButton
          defaultValue="usuario@gluebox.dev"
        />
        <TextBox
          label="Contraseña"
          type="password"
          showPasswordToggle
          error
          errorMessage="La contraseña debe tener al menos 8 caracteres"
        />
      </div>,
    );
    const results = await axe(el);
    expect(results).toHaveNoViolations();
  });

  it('5. NumberBox: spin buttons con etiquetas discernibles e input numérico', async () => {
    const el = renderIntoDom(
      <NumberBox
        label="Cantidad de inventario"
        min={0}
        max={100}
        step={1}
        defaultValue={5}
      />,
    );
    const results = await axe(el);
    expect(results).toHaveNoViolations();
  });

  it('6. TextArea: asociación de label y área de texto multilínea', async () => {
    const el = renderIntoDom(
      <TextArea
        label="Observaciones del pedido"
        placeholder="Ingrese comentarios adicionales..."
        helperText="Máximo 500 caracteres"
        rows={4}
      />,
    );
    const results = await axe(el);
    expect(results).toHaveNoViolations();
  });

  it('7. TagBox: chips eliminables con aria-label y campo de entrada', async () => {
    const el = renderIntoDom(
      <TagBox
        label="Etiquetas del producto"
        defaultValue={['React', 'TypeScript', 'Accesibilidad']}
        showClearButton
      />,
    );
    const results = await axe(el);
    expect(results).toHaveNoViolations();
  });

  it('8. DateBox: campo de fecha con botón de selección y limpieza accesible', async () => {
    const el = renderIntoDom(
      <DateBox
        label="Fecha de entrega"
        defaultValue="2026-10-15"
        showClearButton
      />,
    );
    const results = await axe(el);
    expect(results).toHaveNoViolations();
  });

  it('9. RangeDateBox: rango de fechas accesible con fechas inicio y fin', async () => {
    const el = renderIntoDom(
      <RangeDateBox
        label="Período contable"
        startDefaultValue="2026-01-01"
        endDefaultValue="2026-12-31"
      />,
    );
    const results = await axe(el);
    expect(results).toHaveNoViolations();
  });

  it('10. Select: trigger combobox accesible con etiqueta y opciones asociadas', async () => {
    const el = renderIntoDom(
      <Select
        label="País de facturación"
        options={[
          { value: 'ec', label: 'Ecuador' },
          { value: 'co', label: 'Colombia' },
          { value: 'pe', label: 'Perú' },
        ]}
        defaultValue="ec"
      />,
    );
    const results = await axe(el);
    expect(results).toHaveNoViolations();
  });

  it('11. OptionGroup: rol radiogroup con radio buttons y labels', async () => {
    const el = renderIntoDom(
      <OptionGroup
        label="Método de envío"
        name="shippingMethod"
        options={[
          { value: 'standard', label: 'Estándar (3-5 días)' },
          { value: 'express', label: 'Express (24 horas)' },
        ]}
        defaultValue="standard"
      />,
    );
    const results = await axe(el);
    expect(results).toHaveNoViolations();
  });

  it('12. FileBox: área dropzone interactiva y modo campo con controles accesibles', async () => {
    const el = renderIntoDom(
      <div>
        <FileBox
          label="Adjuntar comprobante"
          buttonLabel="Elegir archivo"
          helperText="Formatos admitidos: PDF, PNG, JPG"
        />
      </div>,
    );
    const results = await axe(el);
    expect(results).toHaveNoViolations();
  });

  it('13. ColorPicker: swatch accesible con nombre, input hex y controles', async () => {
    const el = renderIntoDom(
      <ColorPicker
        label="Color primario de la marca"
        defaultValue="#1976D2"
        showClearButton
      />,
    );
    const results = await axe(el);
    expect(results).toHaveNoViolations();
  });

  it('14. Popup: diálogo modal con role="dialog", aria-modal="true" y título', async () => {
    renderIntoDom(
      <Popup
        open={true}
        onClose={() => {}}
        title="Confirmar eliminación"
      >
        <p>¿Está seguro de que desea eliminar este elemento?</p>
      </Popup>,
    );
    // Popup renders into a portal in document.body
    const results = await axe(document.body);
    expect(results).toHaveNoViolations();
  });

  it('15. Toast: notificaciones accesibles con roles status y alert', async () => {
    const el = renderIntoDom(
      <div>
        <Toast title="Éxito" variant="success" onClose={() => {}}>
          Operación completada con éxito.
        </Toast>
        <Toast title="Atención" variant="warning" onClose={() => {}}>
          Verifique los campos antes de continuar.
        </Toast>
      </div>,
    );
    const results = await axe(el);
    expect(results).toHaveNoViolations();
  });

  it('16. Sidebar: navegación semántica con nav y lista de opciones accesibles', async () => {
    const el = renderIntoDom(
      <Sidebar
        brand={() => <span>Gluebox App</span>}
        userPermissions={[]}
        menu={{
          items: [
            { id: 'dashboard', label: 'Panel principal', path: '/dashboard' },
            { id: 'settings', label: 'Configuración', path: '/settings' },
          ],
        }}
        activePath="/dashboard"
      />,
    );
    const results = await axe(el);
    expect(results).toHaveNoViolations();
  });

  it('17. PageActionsMenu: botón hamburguesa con aria-haspopup y aria-expanded', async () => {
    const el = renderIntoDom(
      <PageActionsMenu
        triggerLabel="Acciones de la página"
        items={[
          { id: 'export', label: 'Exportar CSV' },
          { id: 'print', label: 'Imprimir reporte' },
        ]}
      />,
    );
    const results = await axe(el);
    expect(results).toHaveNoViolations();
  });

  it('18. DataGrid: estructura de tabla o grid con cabeceras y paginación accesible', async () => {
    const el = renderIntoDom(
      <DataGrid
        keyExpr="id"
        columns={[
          { key: 'id', header: 'ID', sortable: true },
          { key: 'name', header: 'Nombre', sortable: true },
          { key: 'role', header: 'Rol' },
        ]}
        dataSource={[
          { id: 1, name: 'Ana Gómez', role: 'Administradora' },
          { id: 2, name: 'Carlos Ruiz', role: 'Operador' },
        ]}
        searchPlaceholder="Buscar usuarios..."
      />,
    );
    const results = await axe(el);
    expect(results).toHaveNoViolations();
  });
});
