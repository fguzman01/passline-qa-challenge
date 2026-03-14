import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { safeClick } from '../utils/uiHelpers';
import { expectVisible, expectCount } from '../utils/assertHelpers';
import { waitForVisible } from '../utils/waitHelpers';

export class CartPage extends BasePage {
  readonly goToStoreButton: Locator;
  readonly yourOrdersButton: Locator;
  readonly logoutButton: Locator;
  readonly dashboardTitle: Locator;
  readonly dashboardSubtitle: Locator;
  readonly cartTable: Locator;
  readonly cartRows: Locator;
  readonly cartBookTitles: Locator;
  readonly cartBookPrices: Locator;
  readonly removeButtons: Locator;
  readonly checkoutButton: Locator;
  readonly emptyCartMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.goToStoreButton   = page.locator('//a[@href="/books" and contains(@class,"btn-success")]');
    this.yourOrdersButton  = page.locator('//a[@href="/users/orders"]');
    this.logoutButton      = page.locator('//a[@href="/users/logout"]');
    this.dashboardTitle    = page.locator('//h1[contains(@class,"display-4")]');
    this.dashboardSubtitle = page.locator('//p[contains(@class,"lead") and contains(normalize-space(.),"Dashboard")]');
    const cartSection      = page.locator('.jumbotron', { has: page.locator('span', { hasText: 'Your cart' }) });
    this.cartTable         = cartSection.locator('table.table').first();
    this.cartRows          = this.cartTable.locator('tbody tr');
    this.cartBookTitles    = this.cartTable.locator('tbody tr td.text-primary');
    this.cartBookPrices    = this.cartTable.locator('tbody tr td.text-danger');
    this.removeButtons     = this.cartTable.locator('tbody tr td button.btn-danger');
    this.checkoutButton    = page.locator('//button[contains(@class,"btn-warning") and normalize-space(.)="Checkout"]');
    this.emptyCartMessage  = page.locator('//span[contains(normalize-space(.), "Your cart is empty")]');
  }

  async waitUntilLoaded(): Promise<void> {
    await waitForVisible(this.dashboardTitle);
    await waitForVisible(this.cartTable);
  }

  async validateCartPageLoaded(): Promise<void> {
    await waitForVisible(this.dashboardTitle);
    await waitForVisible(this.dashboardSubtitle);
    await waitForVisible(this.cartTable);
  }

  async validateBookInCart(title: string): Promise<void> {
    console.log(`Validando que el libro "${title}" está en el carrito...`);
    const bookCell = this.cartBookTitles.filter({ hasText: title }).first();
    await waitForVisible(bookCell);
  }

  async removeFirstBookFromCart(): Promise<void> {
    console.log('Eliminando el primer libro del carrito...');
    await safeClick(this.removeButtons.first());
  }

  async removeBookFromCartByTitle(title: string): Promise<void> {
    console.log(`Eliminando libro del carrito: "${title}"`);
    const row = this.cartRows.filter({ has: this.page.locator('td.text-primary', { hasText: title }) }).first();
    const removeBtn = row.locator('button.btn-danger').first();
    await safeClick(removeBtn);
  }

  async validateCartDoesNotContainBook(title: string): Promise<void> {
    console.log(`Validando que el libro "${title}" ya no está en el carrito...`);
    const bookCell = this.cartBookTitles.filter({ hasText: title });
    await expectCount(bookCell, 0);
  }

  async validateCartIsEmpty(): Promise<void> {
    console.log('Validando que el carrito está vacío...');
    await expectVisible(this.emptyCartMessage);
  }
}
