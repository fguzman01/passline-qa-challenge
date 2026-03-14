import { Page } from '@playwright/test';
import { step, attachment } from 'allure-js-commons';
import { LoginFlow } from './LoginFlow';
import { HomePage } from '../pages/HomePage';
import { BookDetailsPage } from '../pages/BookDetailsPage';
import { CartPage } from '../pages/CartPage';

export class PurchaseFlow {
  private page: Page;
  private loginFlow: LoginFlow;
  private homePage: HomePage;
  private bookDetailsPage: BookDetailsPage;
  private cartPage: CartPage;

  constructor(page: Page) {
    this.page = page;
    this.loginFlow = new LoginFlow(page);
    this.homePage = new HomePage(page);
    this.bookDetailsPage = new BookDetailsPage(page);
    this.cartPage = new CartPage(page);
  }

  async loginAndOpenBookDetails(email: string, password: string, bookTitle: string): Promise<void> {
    await step(`Login y abrir detalle: "${bookTitle}"`, async () => {
      await this.loginFlow.navigateToLogin();
      await this.loginFlow.loginAsUser(email, password);
      await this.loginFlow.validateSuccessfulLogin('testbook');
      await this.homePage.openBookDetailsByTitle(bookTitle);
      await this.bookDetailsPage.waitUntilLoaded();
      await attachment('detalle-libro', await this.page.screenshot({ fullPage: true }), { contentType: 'image/png' });
    });
  }

  async addCurrentBookToCart(): Promise<void> {
    await step('Agregar libro al carrito', async () => {
      await this.bookDetailsPage.addToCart();
      await this.cartPage.waitUntilLoaded();
      await attachment('libro-agregado-carrito', await this.page.screenshot({ fullPage: true }), { contentType: 'image/png' });
    });
  }

  async removeBookFromCart(bookTitle: string): Promise<void> {
    await step(`Eliminar libro del carrito: "${bookTitle}"`, async () => {
      await this.cartPage.removeBookFromCartByTitle(bookTitle);
      await this.cartPage.waitUntilLoaded();
      await attachment('libro-eliminado', await this.page.screenshot({ fullPage: true }), { contentType: 'image/png' });
    });
  }

  async validateBookDetailsLoaded(): Promise<void> {
    await step('Validar detalle del libro cargado', async () => {
      await this.bookDetailsPage.validateBookDetailsLoaded();
      await attachment('validacion-detalle', await this.page.screenshot({ fullPage: true }), { contentType: 'image/png' });
    });
  }

  async validateBookAddedToCart(bookTitle: string): Promise<void> {
    await step(`Validar libro en carrito: "${bookTitle}"`, async () => {
      await this.cartPage.validateBookInCart(bookTitle);
      await attachment('validacion-carrito', await this.page.screenshot({ fullPage: true }), { contentType: 'image/png' });
    });
  }

  async validateCartIsEmpty(): Promise<void> {
    await step('Validar carrito vacío', async () => {
      await this.cartPage.validateCartIsEmpty();
      await attachment('carrito-vacio', await this.page.screenshot({ fullPage: true }), { contentType: 'image/png' });
    });
  }
}
