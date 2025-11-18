import { test, expect } from "@playwright/test";
import { Header } from "../pages/Header";
import { HomePage } from "../pages/HomePage";

test.describe("Check header", () => {
  let homePage: HomePage;
  let header: Header;

  test.beforeEach(async ({ page }) => {
    header = new Header(page);
    homePage = new HomePage(page);
    await homePage.goto();
  });
  test("[Header][Positive] Verify header is visible", async () => {
    await header.verifyHeaderIsVisible();
  });
  test("[Header][Positive] Verify logo is visible", async () => {
    await header.verifyLogoIsVisible();
  });
  test("[Header][Positive] Verify logo image is visible", async () => {
    await header.verifyLogoImageIsVisible();
  });
  test("[Header][Positive] Verify logo image has correct size", async () => {
    await header.verifyLogoImageHasCorrectSize();
  });
  test("[Header][Positive] Verify logo image is a link to the home page", async () => {
    await header.verifyLogoImageIsLinkToHomePage();
  });
  test("[Header][Positive] Verify account icon is visible", async () => {
    await header.verifyAccountIconIsVisible();
  });
  test("[Header][Positive] Verify account icon is a link to the account page", async () => {
    await header.verifyAccountIconIsLinkToAccountPage();
  });
  test("[Header][Positive] Verify customer support number is visible", async () => {
    await header.verifyCustomerSupportNumberIsVisible();
  });
  test("[Header][Positive] Verify customer support number is correct", async () => {
    await header.verifyCustomerSupportNumberIsCorrect();
  });
});