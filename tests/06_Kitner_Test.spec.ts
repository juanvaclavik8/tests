import { test, expect } from "@playwright/test";
import { BASE_URL, TIMEOUT } from "../tests-configuration";

test("Should be possible to search", async ({ page }) => {
  // Perform tests steps

  // Go to page
  await test.step("Go to page", async () => {
    const response = await page.goto(BASE_URL, { timeout: TIMEOUT });
    expect(response?.status()).toBe(200);
  });
});
