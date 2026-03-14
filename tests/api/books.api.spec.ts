import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:5050';

test('[@api] GET /books retorna HTML del catálogo con libros disponibles', async ({ request }) => {
  console.log('Validando endpoint GET /books...');

  const response = await request.get(`${BASE_URL}/books`);

  console.log(`Status recibido: ${response.status()}`);
  expect(response.status()).toBe(200);

  const body = await response.text();

  console.log('Validando que el HTML contiene "Book Store App"...');
  expect(body).toContain('Book Store App');

  console.log('Validando que el HTML contiene "Book Details"...');
  expect(body).toContain('Book Details');
});
