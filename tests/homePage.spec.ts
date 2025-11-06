import { test, expect } from "@playwright/test";
import { searchTerms } from "./searchTerms";
//import searchTermsTest from './searchTermsTest.json' assert { type: 'json' };


test.describe("Home Page", () => {
    //   const VALID_SEARCH_TERM = "Smart Lock";
    //   const INVALID_SEARCH_TERM = "Lorem ipsum";
    //   const EMPTY_SEARCH_TERM = "   ";
    test("[UI][Smoke] Home Page UI elements", async ({ page }) => {
        await page.goto("/");
        await expect(page).toHaveURL("/");
        // check if the page has the title 'The Connected Shop'
        await expect(page).toHaveTitle(
            "The Connected Shop - Smart Locks, Smart Sensors, Smart Home & Office"
        );
        // check if logo is visible
        const logoLink = page.locator(".header__heading-link");
        await expect(logoLink).toBeVisible();
        // check if the logo is a link to the home page
        await expect(logoLink).toHaveAttribute("href", "/");
        const logoImage = page.locator(".header__heading-logo");
        await expect(logoImage).toBeVisible();
        await expect(logoImage).toHaveAttribute("width", "180");
        await expect(logoImage).toHaveAttribute("height", "90.0");
        // check if the account icon is a link to the account page
        const accountIcon = page.locator(".header__icon--account").nth(1); //nth(0)
        await expect(accountIcon).toBeVisible();
        await expect(accountIcon).toHaveAttribute(
            "href",
            "https://theconnectedshop.com/customer_authentication/redirect?locale=en&region_country=UA"
        );
    });

    test("[Search][Positive] Positive tests for search input", async ({ page, }) => {
        await page.goto("/");
        await expect(page).toHaveURL("/");
        // check if the search input is visible
        const searchInput = page.locator("#Search-In-Inline");
        await expect(searchInput).toBeVisible();
        await expect(searchInput).toHaveAttribute("placeholder", "Search");
        await searchInput.fill(searchTerms.valid);
        await expect(searchInput).toHaveValue(searchTerms.valid);
        // cover searchInput by positive tests
        // check if the predictive search is visible
        const predictiveSearch = page.locator("div[data-predictive-search]").nth(0); //.last(), .first(), .nth(1), .nth(2), .nth(3), .nth(4), .nth(5), .nth(6), .nth(7), .nth(8), .nth(9)
        await expect(predictiveSearch).toBeVisible({ timeout: 5000 });
        await expect(predictiveSearch.locator('a[role="option"]')).toContainText(
            "Smart Lock",
            { timeout: 5000 }
        );
        // check if the predictive search shows at least one product
        const productLinks = predictiveSearch.locator(
            '.predictive-search__item-list a[href*="/products/"]'
        );
        await expect(productLinks.first()).toBeVisible();
        const productsCount = await productLinks.count();
        console.log(`Products count: ${productsCount}`);
        expect(productsCount).toBeGreaterThan(0);
        // submit the search
        await searchInput.press("Enter");
        await expect(page).toHaveURL(/\/search\?q=smart\+lock/i);
        // check if the search results are visible
        const searchResultsHeader = page.locator(
            "h1.font-heading-bold.margin-top-1rem"
        );
        await expect(searchResultsHeader).toBeVisible();
        await expect(searchResultsHeader).toHaveText(/Search results/i);
        // check if the search results show at least one product
        const productsResult = page.locator(".card--product");
        await expect(productsResult.first()).toBeVisible();
        const productsResultCount = await productsResult.count();
        console.log(`Products result count: ${productsResultCount}`);
        expect(productsResultCount).toBeGreaterThan(0);
        //check if search result has correct product - use constants
    });
    test("[Search][Negative] Negative tests for search input", async ({ page, }) => {
        await page.goto("/");
        await expect(page).toHaveURL("/");
        // check there is no search results if enter empty query
        const searchInput = page.locator("#Search-In-Inline");
        await searchInput.fill(searchTerms.empty);
        await searchInput.press("Enter");
        await expect(page).toHaveURL("/");

        // check there is no predictive search if enter empty query
        const predictiveSearchHeader = page.locator("a.predictive-search__header");
        await expect(predictiveSearchHeader).toBeHidden();

        // check that there is no product list if enter non existing product
        await searchInput.fill(searchTerms.invalid);
        await expect(searchInput).toHaveValue(searchTerms.invalid); //!!!
        await expect(predictiveSearchHeader).toBeVisible();
        // enter non existing product
        await searchInput.press("Enter");
        const alert = page.locator(".alert--warning");
        await expect(alert).toBeVisible();
        await expect(alert).toContainText(/No results found/i);
        
    });
    test("[Contacts][Positive] Positive tests for contact form", async ({page, }) => {
        //cover contacts page with positive tests
        
    });

});
