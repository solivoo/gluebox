import { test, expect } from '@playwright/test';
import {
  applyThemeAndMode,
  waitForPreviewReady,
  setPlaygroundControl,
  type VisualMode,
} from './helpers/visualTestHelper';

test.describe('Regresión Visual — Estados Clave de Switch', () => {
  test('Switch: defaultChecked=false con label superior', async ({ page }) => {
    await applyThemeAndMode(page, 'light', 'commerce');
    await page.goto('/#/componentes/switch');
    await waitForPreviewReady(page);

    await setPlaygroundControl(page, 'defaultChecked', 'boolean', false);
    await setPlaygroundControl(page, 'labelPosition', 'select', 'top');
    await setPlaygroundControl(page, 'helperText', 'text', 'Sincronización horaria');

    const stage = page.locator('.cpg__preview-stage');
    await expect(stage).toHaveScreenshot('switch-state-unchecked-top.png');
  });

  test('Switch: loading=true', async ({ page }) => {
    await applyThemeAndMode(page, 'light', 'commerce');
    await page.goto('/#/componentes/switch');
    await waitForPreviewReady(page);

    await setPlaygroundControl(page, 'loading', 'boolean', true);

    const stage = page.locator('.cpg__preview-stage');
    await expect(stage).toHaveScreenshot('switch-state-loading.png');
  });

  test('Switch: size=sm con error', async ({ page }) => {
    await applyThemeAndMode(page, 'light', 'commerce');
    await page.goto('/#/componentes/switch');
    await waitForPreviewReady(page);

    await setPlaygroundControl(page, 'size', 'select', 'sm');
    await setPlaygroundControl(page, 'errorMessage', 'text', 'Campo obligatorio');

    const stage = page.locator('.cpg__preview-stage');
    await expect(stage).toHaveScreenshot('switch-state-error-sm.png');
  });
});

test.describe('Regresión Visual — Popup Modal Abierto', () => {
  const MODES: VisualMode[] = ['light', 'dark'];

  for (const mode of MODES) {
    test(`Popup modal abierto [${mode}]`, async ({ page }) => {
      await applyThemeAndMode(page, mode, 'commerce');
      await page.goto('/#/componentes/popup');
      await waitForPreviewReady(page);

      // Abrir el popup
      await page.getByRole('button', { name: 'Abrir Popup' }).click();

      const popup = page.locator('.glb-popup');
      await expect(popup).toBeVisible();
      await page.waitForTimeout(150);

      await expect(popup).toHaveScreenshot(`popup-open-${mode}.png`);
    });
  }
});

test.describe('Regresión Visual — Toast Activo', () => {
  const MODES: VisualMode[] = ['light', 'dark'];

  for (const mode of MODES) {
    test(`Toast flotante activo [${mode}]`, async ({ page }) => {
      await applyThemeAndMode(page, mode, 'commerce');
      await page.goto('/#/componentes/toast');
      await waitForPreviewReady(page);

      // Click mostrar toast
      await page.getByRole('button', { name: 'Mostrar toast' }).click();

      const toast = page.locator('.glb-toast');
      await expect(toast).toBeVisible();
      await page.waitForTimeout(150);

      await expect(toast).toHaveScreenshot(`toast-active-${mode}.png`);
    });
  }
});

test.describe('Regresión Visual — App Shell y Layout Completo', () => {
  const MODES: VisualMode[] = ['light', 'dark'];

  for (const mode of MODES) {
    test(`App Shell completo [${mode}]`, async ({ page }) => {
      await applyThemeAndMode(page, mode, 'commerce');
      await page.goto('/#/componentes/button');
      await waitForPreviewReady(page);

      const appShell = page.locator('.app-shell');
      await expect(appShell).toHaveScreenshot(`app-shell-${mode}.png`);
    });

    test(`Página de Apariencia [${mode}]`, async ({ page }) => {
      await applyThemeAndMode(page, mode, 'commerce');
      await page.goto('/#/apariencia');
      await page.waitForLoadState('networkidle');
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(200);

      const mainContent = page.locator('.app-content');
      await expect(mainContent).toHaveScreenshot(`appearance-page-${mode}.png`);
    });
  }
});
