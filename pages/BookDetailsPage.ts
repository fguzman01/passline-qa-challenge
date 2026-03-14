import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { safeClick } from '../utils/uiHelpers';
import { getText } from '../utils/uiHelpers';
import { expectVisible } from '../utils/assertHelpers';
import { waitForVisible } from '../utils/waitHelpers';

export class BookDetailsPage extends BasePage {
  readonly backToStoreButton: Locator;
  readonly bookImage: Locator;
  readonly bookTitle: Locator;
  readonly bookDescription: Locator;
  readonly bookPrice: Locator;
  readonly addToCartButton: Locator;
  readonly addCommentButton: Locator;

  constructor(page: Page) {
    super(page);
    this.backToStoreButton = page.locator('//a[contains(@class,"view-back-btn") and contains(@class,"btn-success")]');
    this.bookImage         = page.locator('//*[contains(@class,"view-img-book")]');
    this.bookTitle         = page.locator('//h1[contains(@class,"display-4") and contains(@class,"text-success") and contains(@class,"text-center")]');
    this.bookDescription   = page.locator('(//div[contains(@class,"col-md-6")]//p)[1]');
    this.bookPrice         = page.locator('//h3[contains(@class,"lead") and contains(@class,"text-danger")]');
    this.addToCartButton   = page.locator('//button[contains(@class,"btn-warning") and normalize-space(.)="Add to Cart"]');
    this.addCommentButton  = page.locator('//a[contains(@class,"btn-secondary") and normalize-space(.)="Add a Comment"]');
  }

  // ── Esperas ───────────────────────────────────────────────────────────────

  async waitUntilLoaded(): Promise<void> {
    await waitForVisible(this.bookTitle);
    await waitForVisible(this.addToCartButton);
    await waitForVisible(this.bookPrice);
  }

  // ── Validaciones ──────────────────────────────────────────────────────────

  async validateBookDetailsLoaded(): Promise<void> {
    await expectVisible(this.bookTitle);
    await expectVisible(this.bookPrice);
    await expectVisible(this.addToCartButton);
  }

  // ── Getters ───────────────────────────────────────────────────────────────

  async getBookTitle(): Promise<string> {
    return getText(this.bookTitle);
  }

  async getBookPrice(): Promise<string> {
    return getText(this.bookPrice);
  }

  // ── Acciones ──────────────────────────────────────────────────────────────

  async addToCart(): Promise<void> {
    console.log('Agregando libro al carrito...');
    await safeClick(this.addToCartButton);
  }

  async goBackToStore(): Promise<void> {
    console.log('Volviendo al store...');
    await safeClick(this.backToStoreButton);
  }
}
