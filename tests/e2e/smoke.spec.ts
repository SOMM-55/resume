import { test, expect } from "@playwright/test";

test.describe("Resume Smoke Tests", () => {
  test("root redirects to localized resume page", async ({ page }) => {
    const res = await page.goto("/");
    expect(page.url()).toMatch(/\/(en|fa)$/);
  });

  test("English resume page renders core sections and Pipeline DAG", async ({ page }) => {
    await page.goto("/en");

    // Title and headline
    await expect(page).toHaveTitle(/Sayyid Omid Mousavi Mehr/);
    await expect(page.locator("h1")).toContainText("Sayyid Omid Mousavi Mehr");
    await expect(page.getByText("Senior Data Engineer · Agentic Systems", { exact: true })).toBeVisible();

    // Check Pipeline DAG exists
    await expect(page.getByText("Architecture Topology // Live Pipeline DAG")).toBeVisible();

    // Check main sections exist
    await expect(page.locator("#about")).toBeVisible();
    await expect(page.locator("#experience")).toBeVisible();
    await expect(page.locator("#projects")).toBeVisible();
    await expect(page.locator("#skills")).toBeVisible();
    await expect(page.locator("#education")).toBeVisible();
    await expect(page.locator("#contact")).toBeVisible();

    // Mailto link is present
    await expect(page.locator('a[href^="mailto:s.omid.m.mehr@gmail.com"]')).toBeVisible();
  });

  test("Persian page renders with RTL layout and Persian typography", async ({ page }) => {
    await page.goto("/fa");

    const html = page.locator("html");
    const container = page.locator("div[dir='rtl']");

    await expect(container).toBeVisible();
    await expect(page.locator("h1")).toContainText("سید امید موسوی‌مهر");
  });

  test("Admin route enforces authentication and redirects to login", async ({ page }) => {
    await page.goto("/admin");
    expect(page.url()).toContain("/admin/login");
    await expect(page.locator("h1")).toContainText("Admin Portal");
    await expect(page.locator("#admin-username")).toBeVisible();
    await expect(page.locator("#admin-password")).toBeVisible();
  });
});
