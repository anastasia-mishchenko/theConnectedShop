import { test, expect } from "@playwright/test";
import { Search } from "../pages/Search";
import { HomePage } from "../pages/HomePage";
import { searchTerms } from "../test-data/searchTerms";

test.describe("Check search", () => {
  let homePage: HomePage;
  let search: Search;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    search = new Search(page);
    await homePage.goto();
  });

  test("[Search][Positive] Verify search input is visible", async () => {
    await search.verifySearchInputIsVisible();
  });

  test("[Search][Positive] Verify search input has correct placeholder", async () => {
    await search.verifySearchInputHasCorrectPlaceholder();
  });

  test("[Search][Positive] Verify predictive search is visible", async () => {
    await search.verifyPredictiveSearchIsVisible();
  });
  test("[Search][Positive] Verify predictive search contains search term", async () => {
    await search.verifyPredictiveSearchContainsSearchTerm(searchTerms.valid);
  });
  test("[Search][Positive] Verify search input has correct value", async () => {
    await search.verifySearchInputHasCorrectValue(searchTerms.valid);
  });

  test("[Search][Positive] Verify search is showing at least one product", async () => {
    await search.verifyPredictiveSearchIsVisible();
    await expect(search.productLinks.first()).toBeVisible();
    const productsCount = await search.productLinks.count();
    console.log(`Products count: ${productsCount}`);
    expect(productsCount).toBeGreaterThan(0);
  });
  test("[Search][Positive] Submit search and verify search results are visible", async ({
    page,
  }) => {
    await search.submitSearch(searchTerms.valid);
    const encodedSearchTerm = searchTerms.valid
      .replace(/\s+/g, "+")
      .replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    await expect(page).toHaveURL(
      new RegExp(
        `/search\\?q=${encodedSearchTerm}(?:&options%5Bprefix%5D=last)?`,
        "i"
      )
    );
  });
  test("[Search][Negative] Verify no search results if enter empty search term", async ({
  }) => {
       await search.submitSearch(searchTerms.empty);
       await expect(homePage.page).toHaveURL("/");
  });
  test("[Search][Negative] Verify alert no results found is visible if enter invalid search term", async ({
  }) => {
    await search.submitSearch(searchTerms.invalid);
    await search.verifyAlertNoResultsFoundIsVisible();
  });
  test("[Search][Negative] Verify predictive search is not visible if enter empty search term", async ({
    page,
  }) => {
    await search.submitSearch(searchTerms.empty);
    await expect(search.predictiveSearch).toBeHidden();
  });
  test("[Search][Negative] Verify there is no product list if enter non existing product", async ({
  }) => {
    await search.submitSearch(searchTerms.invalid);
    await search.verifyAlertNoResultsFoundIsVisible();
    await expect(search.productLinks).toHaveCount(0);
  });
});
