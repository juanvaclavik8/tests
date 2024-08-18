import { test, expect } from "@playwright/test";
import { BASE_URL, TIMEOUT } from "../tests-configuration";
import {
  MENU_URL_01,
  MENU_URL_02,
  MENU_URL_03,
  MENU_URL_04,
  MENU_URL_05,
  MENU_TEXT_01,
  MENU_TEXT_02,
  MENU_TEXT_03,
  MENU_TEXT_04,
  MENU_TEXT_05,
} from "../tests-data";
import { MENU_LOCATOR } from "../tests-locators";

test("Should click menu and be redirected", async ({ page }) => {
  // Define testing data
  let testingDataArray: string[][] = [
    [MENU_URL_01, MENU_TEXT_01],
    [MENU_URL_02, MENU_TEXT_02],
    [MENU_URL_03, MENU_TEXT_03],
    [MENU_URL_04, MENU_TEXT_04],
  ];

  // Perform tests steps
  // Step: Navigate to the site
  await test.step("Navigate to the site", async () => {
    const response = await page.goto(BASE_URL, { timeout: TIMEOUT });
    expect(response?.status()).toBe(200);
  });

  const menuLocator = page.locator(MENU_LOCATOR);

  for (let i = 0; i < testingDataArray.length; i++) {
    // Step: Check menu item
    await test.step("Check menu item", async () => {
      const expectedUrl = testingDataArray[i][0];
      const menuItemLocator = menuLocator.locator(
        `text=${testingDataArray[i][1]}`
      );
      await menuItemLocator.click();
      await expect(page).toHaveURL(expectedUrl);
      await page.goBack();
    });
  }
});
