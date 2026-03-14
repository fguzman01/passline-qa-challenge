import { test } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { LoginFlow } from '../../flows/LoginFlow';
import { LoginDataProvider } from '../fixtures/providers/LoginDataProvider';

test('[@smoke] Home carga correctamente y muestra libros disponibles', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.open();
  await homePage.waitUntilLoaded();
  await homePage.validateHomeContent();
  await homePage.validateBooksAreDisplayed();
});

test('[@smoke @e2e] Login válido muestra estado autenticado en HomePage', async ({ page }) => {
  const data = LoginDataProvider.getByTag('valid');
  const loginFlow = new LoginFlow(page);
  await loginFlow.navigateToLogin();
  await loginFlow.loginAsUser(data.email, data.password);
  await loginFlow.validateSuccessfulLogin(data.username);
});
