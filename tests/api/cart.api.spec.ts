import { test, expect } from '@playwright/test';
import { LoginDataProvider } from '../fixtures/providers/LoginDataProvider';

const BASE_URL = 'http://localhost:5050';

test('[@api] Flujo de carrito: agregar libro y eliminar hasta dejar carrito vacío', async ({ request }) => {
  const data = LoginDataProvider.getByTag('valid');

  // 1. Login válido
  console.log(`Realizando login con: ${data.email}`);
  const loginResponse = await request.post(`${BASE_URL}/users/login`, {
    form: {
      email: data.email,
      password: data.password,
    },
  });
  expect(loginResponse.status()).toBe(200);

  // 2. Obtener el catálogo de libros
  console.log('Obteniendo catálogo de libros desde GET /books...');
  const booksResponse = await request.get(`${BASE_URL}/books`);
  expect(booksResponse.status()).toBe(200);

  // 3. Extraer el id del primer libro desde href /books/view/{id}
  const booksHtml = await booksResponse.text();
  const bookIdMatch = booksHtml.match(/href="\/books\/view\/([a-f0-9]+)\s*"/);
  expect(bookIdMatch, 'No se encontró ningún libro en el catálogo').not.toBeNull();
  const bookId = bookIdMatch![1];
  console.log(`ID del primer libro encontrado: ${bookId}`);

  // 4. Agregar libro al carrito
  console.log(`Agregando libro ${bookId} al carrito...`);
  const addToCartResponse = await request.post(`${BASE_URL}/users/cart/${bookId}?_method=PUT`);
  expect(addToCartResponse.status()).toBe(200);

  // 5. Consultar dashboard y validar que el carrito tiene contenido
  console.log('Consultando dashboard para validar libro en carrito...');
  const dashboardAfterAdd = await request.get(`${BASE_URL}/users/dashboard`);
  expect(dashboardAfterAdd.status()).toBe(200);
  const htmlAfterAdd = await dashboardAfterAdd.text();
  console.log('Validando que el carrito contiene libros...');
  expect(htmlAfterAdd).toContain('Your cart');

  // 6. Eliminar el libro del carrito
  console.log(`Eliminando libro ${bookId} del carrito...`);
  const removeResponse = await request.post(`${BASE_URL}/users/cart/${bookId}/delete?_method=DELETE`);
  expect(removeResponse.status()).toBe(200);

  // 7. Consultar dashboard y validar carrito vacío
  console.log('Consultando dashboard para validar carrito vacío...');
  const dashboardAfterRemove = await request.get(`${BASE_URL}/users/dashboard`);
  expect(dashboardAfterRemove.status()).toBe(200);
  const htmlAfterRemove = await dashboardAfterRemove.text();
  console.log('Validando que el carrito está vacío...');
  expect(htmlAfterRemove).toContain('Your cart is empty');
});
