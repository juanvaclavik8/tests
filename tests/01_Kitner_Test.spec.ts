import { test, expect } from "@playwright/test";
import { BASE_URL, TIMEOUT } from "../tests-configuration";
import { PAGE_TEXT_01, PAGE_TEXT_02 } from "../tests-data";

test("Should display main site", async ({ page }) => {
  // Define testing data
  let testingDataArray: string[] = [PAGE_TEXT_01, PAGE_TEXT_02];

  // Perform tests steps
  // Step: Go to page
  await test.step("Go to page", async () => {
    const response = await page.goto(BASE_URL, { timeout: TIMEOUT });
    expect(response?.status()).toBe(200);
  });

  for (let i = 0; i < testingDataArray.length; i++) {
    // Step: Check for specific text
    await test.step("Check for specific text", async () => {
      const textToCheck = testingDataArray[1];
      const isVisible = await page.isVisible(`text=${textToCheck}`);
      expect(isVisible).toBeTruthy();
    });
  }
});
