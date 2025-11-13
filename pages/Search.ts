import { expect, Locator, Page } from "@playwright/test";

export class Search {
  // Page elements
  readonly page: Page;

  // Search input
  readonly searchInput: Locator;

  // Predictive search
  readonly predictiveSearch: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.locator("#Search-In-Inline");
    this.predictiveSearch = page.locator("div[data-predictive-search]").nth(0);
  }

  async verifySearchInputIsVisible() {
    await expect(this.searchInput).toBeVisible();
  }

  async verifySearchInputHasCorrectPlaceholder() {
    await expect(this.searchInput).toHaveAttribute("placeholder", "Search");
  }
  async verifyPredictiveSearchIsVisible() {
    await expect(this.predictiveSearch).toBeVisible({ timeout: 5000 });
  }
  async verifyPredictiveSearchContainsSearchTerm(searchTerm: string) {
    await this.searchInput.fill(searchTerm);
    await expect(
      this.predictiveSearch.locator('a[role="option"]')
    ).toContainText(searchTerm, { timeout: 5000 });
  }

  async submitSearch(searchTerm: string) {
    await this.searchInput.fill(searchTerm);
    await this.searchInput.press("Enter");
  }
  async verifySearchInputHasCorrectValue(value: string) {
    await this.searchInput.fill(value);
    await expect(this.searchInput).toHaveValue(value);
  }
}
