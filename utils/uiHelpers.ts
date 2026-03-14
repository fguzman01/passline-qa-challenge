import { Locator, Page } from '@playwright/test';

/**
 * Resalta visualmente el elemento con un borde y fondo amarillo.
 * Útil para depuración y seguimiento visual durante la ejecución.
 */
async function highlightElement(locator: Locator): Promise<void> {
  await locator.evaluate((el: HTMLElement) => {
    el.style.outline = '2px solid yellow';
    el.style.backgroundColor = 'rgba(255, 255, 0, 0.3)';
  });
}

/**
 * Espera que el elemento sea visible, lo resalta, hace scroll si es necesario y ejecuta el click.
 */
export async function safeClick(locator: Locator): Promise<void> {
  await locator.waitFor({ state: 'visible' });
  await highlightElement(locator);
  await locator.scrollIntoViewIfNeeded();
  await locator.click();
  await sleep(300); // Da tiempo a la UI a reaccionar
}

/**
 * Espera que el elemento sea visible, lo resalta, limpia el campo y escribe el valor indicado.
 */
export async function safeFill(locator: Locator, value: string): Promise<void> {
  await locator.waitFor({ state: 'visible' });
  await highlightElement(locator);
  await locator.clear();
  await locator.fill(value);
  await sleep(300); // Da tiempo a la UI a reaccionar
}

/**
 * Espera que el elemento sea visible, lo resalta y escribe el valor carácter a carácter.
 * Útil para inputs que reaccionan a cada pulsación de tecla.
 */
export async function safeType(locator: Locator, value: string): Promise<void> {
  await locator.waitFor({ state: 'visible' });
  await highlightElement(locator);
  await locator.pressSequentially(value);
  await sleep(300); // Da tiempo a la UI a reaccionar
}
// Sleep utilitario para dar tiempo a la UI
async function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Espera que el elemento sea visible, lo resalta y retorna su contenido de texto.
 */
export async function getText(locator: Locator): Promise<string> {
  await locator.waitFor({ state: 'visible' });
  await highlightElement(locator);
  return (await locator.textContent()) ?? '';
}

/**
 * Navega a la URL indicada y espera hasta que la red esté inactiva.
 */
export async function safeNavigate(page: Page, url: string): Promise<void> {
  await page.goto(url, { waitUntil: 'networkidle' });
}
