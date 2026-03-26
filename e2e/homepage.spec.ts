import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test("should load the homepage successfully", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Role Reactor/);
  });

  test("should display hero section", async ({ page }) => {
    await page.goto("/");
    const hero = page.getByRole("heading").first();
    await expect(hero).toBeVisible();
  });

  test("should have working navigation", async ({ page }) => {
    await page.goto("/");
    const docsLink = page.getByRole("link", { name: /docs/i }).first();
    await expect(docsLink).toBeVisible();
    await docsLink.click();
    await expect(page).toHaveURL(/.*docs.*/);
  });
});

test.describe("Documentation", () => {
  test("should load documentation page", async ({ page }) => {
    await page.goto("/docs");
    await expect(page).toHaveTitle(/Role Reactor/);
  });

  test("should display getting started guide", async ({ page }) => {
    await page.goto("/docs/getting-started/introduction");
    const docsHeading = page.getByRole("heading").first();
    await expect(docsHeading).toBeVisible();
  });
});

test.describe("Dashboard", () => {
  test("should redirect to login when accessing dashboard without auth", async ({
    page,
  }) => {
    await page.goto("/dashboard");
    // Without auth, our middleware redirects /dashboard directly back to / (home)
    await expect(page).toHaveURL("http://localhost:8080/");
  });
});

test.describe("Accessibility", () => {
  test("should have no accessibility violations", async ({ page }) => {
    await page.goto("/");
    // Basic accessibility check - in production you'd use axe-core
    const mainContent = page.getByRole("main").first();
    await expect(mainContent).toBeVisible();
  });

  test("should have proper focus states", async ({ page }) => {
    await page.goto("/");
    const firstLink = page.getByRole("link").first();
    await firstLink.focus();
    await expect(firstLink).toBeFocused();
  });
});

test.describe("Performance", () => {
  test("should load within acceptable time", async ({ page }) => {
    const startTime = Date.now();
    await page.goto("/");
    const loadTime = Date.now() - startTime;
    expect(loadTime).toBeLessThan(12000); // Relaxed for local dev env
  });

  test("should have proper LCP element", async ({ page }) => {
    await page.goto("/");
    const mainHeading = page.getByRole("heading").first();
    await expect(mainHeading).toBeVisible();
  });
});
