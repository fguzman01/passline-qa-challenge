
import { test, Page } from '@playwright/test';
import { LoginFlow } from '../../flows/LoginFlow';
import { LoginDataProvider } from '../fixtures/providers/LoginDataProvider';

let page: Page;
let loginFlow: LoginFlow;

test.beforeEach(async ({ page: testPage }) => {
  page = testPage;
  loginFlow = new LoginFlow(page);
  await loginFlow.navigateToLogin();
});

test('[@e2e] Login inválido muestra error de autenticación', async () => {
  const data = LoginDataProvider.getByTag('invalid');
  await loginFlow.loginAsUser(data.email, data.password);
  await loginFlow.validateAuthenticationError();
});

test('[@e2e @smoke] Login válido muestra estado autenticado en HomePage', async () => {
  const data = LoginDataProvider.getByTag('valid');
  await loginFlow.loginAsUser(data.email, data.password);
  await loginFlow.validateSuccessfulLogin(data.username);
});
