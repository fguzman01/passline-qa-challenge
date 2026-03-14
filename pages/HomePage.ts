import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { safeClick } from '../utils/uiHelpers';
import { expectVisible, expectText } from '../utils/assertHelpers';
import { waitForVisible } from '../utils/waitHelpers';

export class HomePage extends BasePage {
  readonly pageTitle: Locator;
  readonly subtitle: Locator;
  readonly loginButton: Locator;
  readonly bookCards: Locator;
  readonly bookTitles: Locator;
  readonly bookPrices: Locator;
  readonly bookDetailsButtons: Locator;
  // Estado autenticado
  readonly loggedUserName: Locator;
  readonly dashboardButton: Locator;
  readonly successLoginAlert: Locator;
  readonly successLoginMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.pageTitle    = page.locator('h1.display-4');
    this.subtitle          = page.locator('p.lead.ml-2');
    this.loginButton       = page.locator('a.btn.btn-success', { hasText: 'Login' });
    this.bookCards         = page.locator('div.home-books .card');
    this.bookTitles        = page.locator('div.home-books .card-title');
    this.bookPrices        = page.locator('div.home-books .text-danger');
    this.bookDetailsButtons = page.locator('div.home-books .card a.btn-primary');
    // Locators autenticado
    this.loggedUserName = page.locator('span.user-name-home');
    this.dashboardButton = page.locator('a[href="/users/dashboard"]');
    this.successLoginAlert = page.locator('.alert-success');
    this.successLoginMessage = page.locator('.alert-success');
  }
  // ── Estado autenticado ──────────────────────────────────────────────────

  async waitForSuccessfulLogin(): Promise<void> {
    await waitForVisible(this.successLoginAlert);
    await waitForVisible(this.dashboardButton);
  }

  async validateSuccessfulLoginMessage(): Promise<void> {
    await expectText(this.successLoginMessage, 'Successfully Logged In');
  }

  async validateDashboardButtonVisible(): Promise<void> {
    await expectVisible(this.dashboardButton);
  }

  async validateLoggedUserName(expectedName: string): Promise<void> {
    await expectText(this.loggedUserName, expectedName);
  }

  // ── Navegación ────────────────────────────────────────────────────────────

  async open(): Promise<void> {
    await this.navigate('/books');
  }

  // ── Esperas ───────────────────────────────────────────────────────────────

  async waitUntilLoaded(): Promise<void> {
    await waitForVisible(this.pageTitle);
    await waitForVisible(this.bookCards.first());
    await waitForVisible(this.loginButton);
  }

  // ── Validaciones ──────────────────────────────────────────────────────────

  async validateHomeContent(): Promise<void> {
    await expectText(this.pageTitle, 'Book Store App');
    await expectText(this.subtitle, 'View our hand-picked Tech Books');
    await expectVisible(this.loginButton);
  }

  async validateBooksAreDisplayed(): Promise<void> {
    await expectVisible(this.bookCards.first());
  }

  // ── Getters ───────────────────────────────────────────────────────────────

  async getBooksCount(): Promise<number> {
    return this.bookCards.count();
  }

  async getBookTitles(): Promise<string[]> {
    return this.bookTitles.allTextContents();
  }

  // ── Acciones ──────────────────────────────────────────────────────────────

  async goToLogin(): Promise<void> {
    console.log('Navegando al login...');
    await safeClick(this.loginButton);
  }

  async openFirstBookDetails(): Promise<void> {
    console.log('Abriendo detalle del primer libro...');
    await safeClick(this.bookDetailsButtons.first());
  }

  async openBookDetailsByTitle(title: string): Promise<void> {
    console.log(`Abriendo detalle del libro: "${title}"`);
    const card = this.bookCards.filter({
      has: this.page.locator('.card-title', { hasText: title })
    });
    const detailsButton = card.locator('a.btn-primary');
    await safeClick(detailsButton.first());
  }
}
