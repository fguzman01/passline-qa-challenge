import { Page } from '@playwright/test';
import { config } from '../utils/envConfig'

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // ── Navegación ────────────────────────────────────────────────────────────

  async navigate(path: string): Promise<void> {
    //await this.page.goto(path);
    await this.page.goto(`${config.baseUrl}${path}`)
  }

  // ── Getters ───────────────────────────────────────────────────────────────

  async getTitle(): Promise<string> {
    return this.page.title();
  }

  getCurrentUrl(): string {
    return this.page.url();
  }
}
