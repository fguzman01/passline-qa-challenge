import { expect, Locator, Page } from '@playwright/test';

/**
 * Valida que el elemento esté visible en la página.
 */
export async function expectVisible(locator: Locator): Promise<void> {
  await expect(locator).toBeVisible();
}

/**
 * Valida que el elemento no esté visible en la página.
 */
export async function expectHidden(locator: Locator): Promise<void> {
  await expect(locator).toBeHidden();
}

/**
 * Valida que el elemento contenga el texto esperado (coincidencia parcial).
 */
export async function expectText(locator: Locator, text: string): Promise<void> {
  await expect(locator).toContainText(text);
}

/**
 * Valida que el texto del elemento sea exactamente igual al esperado.
 */
export async function expectExactText(locator: Locator, text: string): Promise<void> {
  await expect(locator).toHaveText(text);
}

/**
 * Valida que la cantidad de elementos encontrados sea la esperada.
 */
export async function expectCount(locator: Locator, count: number): Promise<void> {
  await expect(locator).toHaveCount(count);
}

/**
 * Valida que la URL actual contenga el texto indicado.
 */
export async function expectUrlContains(page: Page, value: string): Promise<void> {
  await expect(page).toHaveURL(new RegExp(value));
}
