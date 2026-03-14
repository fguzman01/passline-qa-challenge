import { Page } from '@playwright/test';
import { step, attachment } from 'allure-js-commons';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';

export class LoginFlow {
  private page: Page;
  private loginPage: LoginPage;
  private homePage: HomePage;

  constructor(page: Page) {
    this.page = page;
    this.loginPage = new LoginPage(page);
    this.homePage = new HomePage(page);
  }

  async navigateToLogin(): Promise<void> {
    await step('Navegar a página de login', async () => {
      await this.loginPage.open();
      await this.loginPage.waitUntilLoaded();
      await attachment('login-page', await this.page.screenshot({ fullPage: true }), { contentType: 'image/png' });
    });
  }

  async loginAsUser(email: string, password: string): Promise<void> {
    await step(`Ingresar credenciales: ${email}`, async () => {
      await this.loginPage.enterEmail(email);
      await this.loginPage.enterPassword(password);
      await this.loginPage.clickSubmit();
      await attachment('credenciales-ingresadas', await this.page.screenshot({ fullPage: true }), { contentType: 'image/png' });
    });
  }

  async validateAuthenticationError(): Promise<void> {
    await step('Validar error de autenticación', async () => {
      await this.loginPage.waitForAuthenticationError();
      await this.loginPage.validateAuthenticationErrorMessage();
      await attachment('error-autenticacion', await this.page.screenshot({ fullPage: true }), { contentType: 'image/png' });
    });
  }

  async validateSuccessfulLogin(expectedUserName: string): Promise<void> {
    await step(`Validar login exitoso: ${expectedUserName}`, async () => {
      await this.homePage.waitForSuccessfulLogin();
      await this.homePage.validateSuccessfulLoginMessage();
      await this.homePage.validateDashboardButtonVisible();
      await this.homePage.validateLoggedUserName(expectedUserName);
      await attachment('login-exitoso', await this.page.screenshot({ fullPage: true }), { contentType: 'image/png' });
    });
  }
}
