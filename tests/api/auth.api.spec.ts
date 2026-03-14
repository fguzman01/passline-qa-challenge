import { test, expect } from '@playwright/test';
import { LoginDataProvider } from '../fixtures/providers/LoginDataProvider';

const BASE_URL = 'http://localhost:5050';

// ── Test 1 Login credenciales no válidas ──────────────────────────────────────────────────────────────

test('[@api] POST /users/login con credenciales inválidas retorna Authentication Error', async ({ request }) => {
  const data = LoginDataProvider.getByTag('invalid');

  console.log(`Enviando POST /users/login con usuario inválido: ${data.email}`);

  const response = await request.post(`${BASE_URL}/users/login`, {
    form: {
      email: data.email,
      password: data.password,
    },
  });

  console.log(`Status recibido: ${response.status()}`);
  expect(response.status()).not.toBe(302);

  const body = await response.text();

  console.log('Validando que el HTML contiene "Authentication Error"...');
  expect(body).toContain('Authentication Error');
});

// ── Test 2 Login credenciales válidas ──────────────────────────────────────────────────────────────

test('[@api] POST /users/login con credenciales válidas redirige al dashboard', async ({ request }) => {
  const data = LoginDataProvider.getByTag('valid');

  console.log(`Enviando POST /users/login con usuario válido: ${data.email}`);

  const response = await request.post(`${BASE_URL}/users/login`, {
    form: {
      email: data.email,
      password: data.password,
    },
  });

  console.log(`Status recibido: ${response.status()}`);
  expect(response.status()).toBe(200);

  const body = await response.text();

  console.log(`Validando nombre usuario autenticado en el HTML del dashboard: ${data.username}...`);
  expect(body).toContain(data.username);
});



