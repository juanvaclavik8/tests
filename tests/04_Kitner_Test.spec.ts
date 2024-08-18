import { test, expect } from "@playwright/test";
import { DICTIONARY_URL, TIMEOUT } from "../tests-configuration";
import { MIN_DICTIONARY_KEYS_COUNT } from "../tests-data";
import { DICTIONARY_LOCATOR } from "../tests-locators";

test("Should dictionary have some min count of keys", async ({ page }) => {
  // Perform tests steps

  // Go to page
  await test.step("Check sales site", async () => {
    const response = await page.goto(DICTIONARY_URL, { timeout: TIMEOUT });
    expect(response?.status()).toBe(200);
  });

  // Check dictionary keys count
  await test.step("Check sales site", async () => {
    const dictionaryLocator = page.locator(DICTIONARY_LOCATOR);
    const liCount = await dictionaryLocator.locator("li").count();
    await expect(liCount).toBeGreaterThan(MIN_DICTIONARY_KEYS_COUNT);
  });
});
