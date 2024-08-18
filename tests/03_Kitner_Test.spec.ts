import { test, expect } from "@playwright/test";
import {
  TIMEOUT,
  SALES_URL_01,
  SALES_URL_02,
  SALES_URL_03,
  SALES_URL_04,
} from "../tests-configuration";
import {
  SALES_PAGE_TEXT_01,
  SALES_PAGE_TEXT_02,
  SALES_PAGE_TEXT_03,
  SALES_PAGE_TEXT_04,
} from "../tests-data";

test("Should sales pages work", async ({ page }) => {
  // Define testing data
  let testingDataArray: string[][] = [
    [SALES_URL_01, SALES_PAGE_TEXT_01],
    [SALES_URL_02, SALES_PAGE_TEXT_02],
    [SALES_URL_03, SALES_PAGE_TEXT_03],
    [SALES_URL_04, SALES_PAGE_TEXT_04],
  ];

  // Perform tests steps
  for (let i = 0; i < testingDataArray.length; i++) {
    // Go to page
    await test.step("Go to page", async () => {
      const response = await page.goto(testingDataArray[i][0], {
        timeout: TIMEOUT,
      });
      expect(response?.status()).toBe(200);
    });

    // Check its text
    await test.step("Check its text", async () => {
      const textToCheck = testingDataArray[i][1];
      const isVisible = await page.isVisible(`text=${textToCheck}`);
      expect(isVisible).toBeTruthy();
    });
  }
});
