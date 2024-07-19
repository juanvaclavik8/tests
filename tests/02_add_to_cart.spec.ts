import { test, expect } from "@playwright/test";

// Login
test.beforeEach(async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill("standard_user");
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill("secret_sauce");
  await page.locator('[data-test="login-button"]').click();

  await expect(page).toHaveTitle("Swag Labs");
});

// Add to cart
test("test1", async ({ page }) => {
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="shopping-cart-link"]').click();
  await page.locator('[data-test="inventory-item"]').click();

  const value = await page.locator('[data-test="item-quantity"]').textContent();
  console.log(value);
  await expect(value).toBe("1");
});
