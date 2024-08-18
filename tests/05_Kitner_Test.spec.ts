import { test, expect } from "@playwright/test";
import { BASE_URL, TIMEOUT } from "../tests-configuration";

test("Should all url hrefs work", async ({ page }) => {
  // Perform tests steps

  // Go to page
  await test.step("Go to page", async () => {
    const response = await page.goto(BASE_URL, { timeout: TIMEOUT });
    expect(response?.status()).toBe(200);
  });

  // Gather all hrefs
  let hrefs: string[] = [];
  await test.step("Gather all hrefs", async () => {
    const linksLocator = page.locator("a");
    const numberOfLinks = await linksLocator.count();
    console.log(`Number of links found: ${numberOfLinks}`);

    for (let i = 0; i < numberOfLinks; i++) {
      const link = linksLocator.nth(i);
      const href = await link.getAttribute("href");
      if (href) {
        hrefs.push(href);
        console.log(href);
      }
    }
  });

  // Remove href duplicates
  let uniqueHrefs: string[] = [];
  await test.step("Remove href duplicates", async () => {
    uniqueHrefs = [...new Set(hrefs)];
  });

  // Remove non url hrefs
  let uniqueUrls: string[] = [];
  await test.step("Remove non url hrefs", async () => {
    for (const str of uniqueHrefs) {
      if (str.startsWith("https:")) uniqueUrls.push(str);
    }
  });

  // Check if hrefs work
  await test.step("Check sales site", async () => {
    for (let i = 0; i < uniqueUrls.length; i++) {
      const response = await page.goto(uniqueUrls[i], { timeout: TIMEOUT });
      expect(response?.status()).toBe(200);
    }
  });
});
