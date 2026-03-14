import { Page } from '@playwright/test';
import { config } from '../utils/envConfig'

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navega a una ruta relativa dentro del sitio.
   */
  async navigate(path: string): Promise<void> {
    //await this.page.goto(path);
    await this.page.goto(`${config.baseUrl}${path}`)
  }

  /**
   * Retorna el título de la página actual.
   */
  async getTitle(): Promise<string> {
    return this.page.title();
  }

  /**
   * Retorna la URL de la página actual.
   */
  getCurrentUrl(): string {
    return this.page.url();
  }
}
