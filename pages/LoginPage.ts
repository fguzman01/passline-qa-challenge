

import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './BasePage.js';
import { safeClick, safeFill } from '../utils/uiHelpers.js';
import { waitForVisible } from '../utils/waitHelpers.js';
import { expectText } from '../utils/assertHelpers.js';

export class LoginPage extends BasePage {
  readonly title: Locator;
  readonly subtitle: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly registerLink: Locator;
  readonly backToStoreLink: Locator;
 readonly authErrorAlert: Locator;
  readonly authErrorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.locator('h1.display-4', { hasText: 'Login' });
    this.subtitle = page.locator('p.lead', { hasText: 'Verify Your Account' });
    this.emailInput = page.locator('#email');
    this.passwordInput = page.locator('#password');
    this.submitButton = page.locator('button.btn-success', { hasText: 'Submit' });
    this.registerLink = page.locator('a[href="/users/register"]');
    this.backToStoreLink = page.locator('a[href="/books"]');
    this.authErrorAlert = page.locator('//div[contains(@class,"alert") and contains(.,"Authentication Error")]');
    this.authErrorMessage = page.locator('//div[contains(@class,"alert") and contains(.,"Authentication Error")]/p');
  }

  async open(): Promise<void> {
    await this.navigate('/users/login');
  }

  async waitUntilLoaded(): Promise<void> {
    await waitForVisible(this.title);
    await waitForVisible(this.emailInput);
    await waitForVisible(this.passwordInput);
    await waitForVisible(this.submitButton);
  }

  async enterEmail(email: string): Promise<void> {
    console.log(`Ingresando email: ${email}`);
    await safeFill(this.emailInput, email);
  }

  async enterPassword(password: string): Promise<void> {
    console.log(`Ingresando password: ${password}`);
    await safeFill(this.passwordInput, password);
  }

  async clickSubmit(): Promise<void> {
    console.log('Enviando formulario de login');
    await safeClick(this.submitButton);
  }


  async goToRegister(): Promise<void> {
    console.log('Navegando a registro de usuario');
    await safeClick(this.registerLink);
  }

  async goBackToStore(): Promise<void> {
    console.log('Volviendo al store');
    await safeClick(this.backToStoreLink);
  }

    async waitForAuthenticationError(): Promise<void> {
    await waitForVisible(this.authErrorAlert);
  }

  async validateAuthenticationErrorMessage(): Promise<void> {
    waitForVisible(this.authErrorAlert);
    console.log(this.authErrorMessage);
    await expectText(this.authErrorMessage, 'Authentication Error');
  }
}
