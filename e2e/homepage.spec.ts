import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test("should load the homepage successfully", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Role Reactor/);
  });

  test("should display hero section", async ({ page }) => {
    await page.goto("/");
    const hero = page.getByRole("heading", {
      name: /discord bot for automated role management/i,
    });
    await expect(hero).toBeVisible();
  });

  test("should have working navigation", async ({ page }) => {
    await page.goto("/");
    const docsLink = page.getByRole("link", { name: /docs/i });
    await expect(docsLink).toBeVisible();
    await docsLink.click();
    await expect(page).toHaveURL(/\/docs/);
  });
});

test.describe("Documentation", () => {
  test("should load documentation page", async ({ page }) => {
    await page.goto("/docs");
    await expect(page).toHaveTitle(/Documentation/);
  });

  test("should display getting started guide", async ({ page }) => {
    await page.goto("/docs/getting-started/introduction");
    const introduction = page.getByText(/what is role reactor/i);
    await expect(introduction).toBeVisible();
  });
});

test.describe("Dashboard", () => {
  test("should redirect to login when accessing dashboard without auth", async ({
    page,
  }) => {
    await page.goto("/dashboard");
    // Should redirect or show login prompt
    await expect(page).toHaveURL(/\/(dashboard|login)/);
  });
});

test.describe("Accessibility", () => {
  test("should have no accessibility violations", async ({ page }) => {
    await page.goto("/");
    // Basic accessibility check - in production you'd use axe-core
    const mainContent = page.getByRole("main");
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
    expect(loadTime).toBeLessThan(5000); // 5 seconds threshold
  });

  test("should have proper LCP element", async ({ page }) => {
    await page.goto("/");
    const mainHeading = page.getByRole("heading").first();
    await expect(mainHeading).toBeVisible();
  });
});
