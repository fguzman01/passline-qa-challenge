import { Page, TestInfo } from '@playwright/test';
import * as path from 'path';
import * as fs from 'fs';

export async function attachFinalScreenshot(page: Page, testInfo: TestInfo): Promise<void> {
  const safeName = testInfo.title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
  const screenshotDir = path.join('test-results');
  const screenshotPath = path.join(screenshotDir, `${safeName}.png`);

  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }

  await page.screenshot({ path: screenshotPath, fullPage: true });

  await testInfo.attach('final-screenshot', {
    path: screenshotPath,
    contentType: 'image/png',
  });
}
