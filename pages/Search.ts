import { expect, Locator, Page } from "@playwright/test";
import { searchTerms } from "../test-data/searchTerms";

export class Search {
  // Page elements
  readonly page: Page;

  // Search input
  readonly searchInput: Locator;

  // Predictive search
  readonly predictiveSearch: Locator;
  readonly productLinks: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.locator("#Search-In-Inline");
    this.predictiveSearch = page.locator("div[data-predictive-search]").nth(0);
    this.productLinks = this.predictiveSearch.locator(
      '.predictive-search__item-list a[href*="/products/"]'
    );
  }

  async verifySearchInputIsVisible() {
    await expect(this.searchInput).toBeVisible();
  }

  async verifySearchInputHasCorrectPlaceholder() {
    await expect(this.searchInput).toHaveAttribute("placeholder", "Search");
  }
  async verifyPredictiveSearchIsVisible() {
    await this.searchInput.fill(searchTerms.valid);
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
async verifyAlertNoResultsFoundIsVisible() {
    const alert = this.page.locator(".alert--warning");
    await expect(alert).toBeVisible();
    await expect(alert).toContainText(/No results found/i);
  }
}
