import { Locator, Page } from '@playwright/test';

/**
 * Espera que el elemento sea visible en el DOM.
 */
export async function waitForVisible(locator: Locator): Promise<void> {
  await locator.waitFor({ state: 'visible' });
}

/**
 * Espera que el elemento esté oculto o sea removido del DOM.
 */
export async function waitForHidden(locator: Locator): Promise<void> {
  await locator.waitFor({ state: 'hidden' });
}

/**
 * Espera que la página termine de cargar esperando que la red esté inactiva.
 */
export async function waitForPageLoad(page: Page): Promise<void> {
  await page.waitForLoadState('domcontentloaded');
}
/**
 * Espera una respuesta de red cuya URL contenga el texto indicado
 * y valida que el status sea 200.
 */
export async function waitForApiResponse(page: Page, urlPart: string): Promise<void> {
  await page.waitForResponse((res) =>
    res.url().includes(urlPart) && res.status() === 200
  );
}
