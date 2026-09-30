import { test, expect } from '@playwright/test';
import { applyThemeAndMode, waitForPreviewReady, type VisualMode } from './helpers/visualTestHelper';

const COMPONENTS = [
  { name: 'button', path: '/componentes/button' },
  { name: 'switch', path: '/componentes/switch' },
  { name: 'checkbutton', path: '/componentes/checkbutton' },
  { name: 'textbox', path: '/componentes/textbox' },
  { name: 'numberbox', path: '/componentes/numberbox' },
  { name: 'filebox', path: '/componentes/filebox' },
  { name: 'colorpicker', path: '/componentes/colorpicker' },
  { name: 'textarea', path: '/componentes/textarea' },
  { name: 'tagbox', path: '/componentes/tagbox' },
  { name: 'sidebar', path: '/componentes/sidebar' },
  { name: 'datebox', path: '/componentes/datebox' },
  { name: 'rangedatebox', path: '/componentes/rangedatebox' },
  { name: 'optiongroup', path: '/componentes/optiongroup' },
  { name: 'popup', path: '/componentes/popup' },
  { name: 'toast', path: '/componentes/toast' },
  { name: 'pageactionsmenu', path: '/componentes/pageactionsmenu' },
  { name: 'datagrid', path: '/componentes/datagrid' },
  { name: 'select', path: '/componentes/select' },
];

const MODES: VisualMode[] = ['light', 'dark'];

test.describe('Regresión Visual — Componentes Base (Tema Commerce MUI)', () => {
  for (const component of COMPONENTS) {
    for (const mode of MODES) {
      test(`${component.name} [${mode}]`, async ({ page }) => {
        await applyThemeAndMode(page, mode, 'commerce');
        await page.goto(`/#${component.path}`);
        await waitForPreviewReady(page);

        const stage = page.locator('.cpg__preview-stage');
        await expect(stage).toHaveScreenshot(`${component.name}-${mode}.png`);
      });
    }
  }
});
