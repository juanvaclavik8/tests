import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("https://kitner.cz/");
  await page.getByTitle("Hledat").click();
  await page.getByLabel("Hlavní menu").getByPlaceholder("Hledání").click();
  await page
    .getByLabel("Hlavní menu")
    .getByPlaceholder("Hledání")
    .fill("tester");
  await page.getByLabel("Hlavní menu").getByText("").click();
  await page.locator("#content").getByPlaceholder("Hledání").click();
  await page.locator("#content").getByPlaceholder("Hledání").fill("");
  await page
    .getByRole("link", {
      name: "Jak začít jako tester/QA expert?",
      exact: true,
    })
    .click();
  await page
    .getByLabel("Page Title Bar")
    .getByRole("heading", { name: "Jak začít jako tester/QA" })
    .click();
});
