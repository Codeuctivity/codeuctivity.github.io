import { test, expect } from '@playwright/test';

test('links a web app manifest with installable icons', async ({ page, request }) => {
  await page.goto('/');

  await expect(page.locator('link[rel="manifest"]')).toHaveAttribute('href', '/manifest.webmanifest');

  const manifest = await (await request.get('/manifest.webmanifest')).json();
  expect(manifest.display).toBe('standalone');
  for (const size of ['192x192', '512x512']) {
    const icon = manifest.icons.find((candidate: { sizes: string }) => candidate.sizes === size);
    expect((await request.get(icon.src)).status()).toBe(200);
  }
});

test('shows the install button only while the browser offers to install', async ({ page }) => {
  await page.goto('/');
  const button = page.getByRole('button', { name: 'Install app' });
  await expect(button).toHaveCount(0);

  // Browsers only fire the real event for a site they consider installable, so stand in for it.
  await page.evaluate(() => {
    const offer = new Event('beforeinstallprompt', { cancelable: true });
    Object.assign(offer, {
      prompt: () => {
        document.body.dataset.installPrompted = 'yes';
        return Promise.resolve();
      },
    });
    window.dispatchEvent(offer);
  });
  await expect(button).toBeVisible();

  await button.click();
  await expect(page.locator('body')).toHaveAttribute('data-install-prompted', 'yes');
  await expect(button).toHaveCount(0);
});
