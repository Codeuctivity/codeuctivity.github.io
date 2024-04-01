import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Hello from codeuctivity/);
});

test('get text of landing page', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('h1')).toContainText('codeuctivity');
  await expect(page.getByRole('banner')).toContainText('Turning Coffee into Code: A Journey of Joyful Creation');
});
