import { test } from '@playwright/test';
import { PurchaseFlow } from '../../flows/PurchaseFlow';
import { LoginDataProvider } from '../fixtures/providers/LoginDataProvider';

const BOOK_TITLE = 'The Pragmatic Programmer';

test('[@e2e] Flujo de compra: login, agregar libro al carrito y eliminar', async ({ page }) => {
  const data = LoginDataProvider.getByTag('valid');
  const purchaseFlow = new PurchaseFlow(page);

  await purchaseFlow.loginAndOpenBookDetails(data.email, data.password, BOOK_TITLE);
  await purchaseFlow.validateBookDetailsLoaded();

  await purchaseFlow.addCurrentBookToCart();
  await purchaseFlow.validateBookAddedToCart(BOOK_TITLE);

  await purchaseFlow.removeBookFromCart(BOOK_TITLE);
  await purchaseFlow.validateCartIsEmpty();
});
