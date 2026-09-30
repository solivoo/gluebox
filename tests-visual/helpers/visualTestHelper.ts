import { type Page, expect } from '@playwright/test';

export type VisualMode = 'light' | 'dark';

/**
 * Aplica el tema y modo a la página de demo antes o después de la navegación.
 */
export async function applyThemeAndMode(page: Page, mode: VisualMode, theme = 'commerce') {
  await page.addInitScript(
    ({ th, md }: { th: string; md: string }) => {
      localStorage.setItem('glubox-demo-theme', th);
      localStorage.setItem('glubox-demo-mode', md);
    },
    { th: theme, md: mode }
  );
}

/**
 * Garantiza que la página, fuentes y el escenario de preview estén completamente renderizados.
 */
export async function waitForPreviewReady(page: Page) {
  await page.waitForLoadState('networkidle');
  await page.evaluate(() => document.fonts.ready);
  const stage = page.locator('.cpg__preview-stage');
  await expect(stage).toBeVisible();
  // Breve espera para estabilización de render y estilos CSS
  await page.waitForTimeout(200);
}

/**
 * Modifica una propiedad en el panel de control del ComponentPlayground.
 */
export async function setPlaygroundControl(
  page: Page,
  name: string,
  kind: 'boolean' | 'select' | 'text',
  value: string | boolean
) {
  await page.evaluate(
    ({ name, kind, value }) => {
      const controls = Array.from(document.querySelectorAll('.pc-control'));
      const control = controls.find(
        (c) => c.querySelector('.pc-control__name')?.textContent?.trim() === name
      );
      if (!control) return;

      if (kind === 'boolean') {
        const input = control.querySelector('.pc-control__toggle input') as HTMLInputElement | null;
        if (input && input.checked !== value) {
          input.click();
        }
      } else if (kind === 'select') {
        const select = control.querySelector('.pc-control__select') as HTMLSelectElement | null;
        if (select) {
          select.value = String(value);
          select.dispatchEvent(new Event('change', { bubbles: true }));
        }
      } else if (kind === 'text') {
        const input = control.querySelector('.pc-control__text') as HTMLInputElement | null;
        if (input) {
          const setter = Object.getOwnPropertyDescriptor(
            window.HTMLInputElement.prototype,
            'value'
          )?.set;
          if (setter) {
            setter.call(input, value);
          } else {
            input.value = String(value);
          }
          input.dispatchEvent(new Event('input', { bubbles: true }));
        }
      }
    },
    { name, kind, value }
  );

  await page.waitForTimeout(150);
}
