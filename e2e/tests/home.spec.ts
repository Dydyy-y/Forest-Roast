import { test, expect } from '@playwright/test';

test('homepage displays product', async ({ page }) => {
  await page.goto('http://localhost:5173');
  // On suppose que les cartes produits ont un bouton "Voir le détail"
  await expect(page.locator('text=voir le détail')).toBeVisible();
});