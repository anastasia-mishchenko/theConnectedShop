import { expect, Locator, Page } from "@playwright/test";

export class Header {
  // Page elements        readonly searchInput: Locator;
  readonly page: Page;

  // Logo
  readonly logoLink: Locator;
  readonly logoImage: Locator;

  // Account icon
  readonly accountIcon: Locator;
  readonly accountIconLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logoLink = page.locator(".header__heading-link");
    this.logoImage = page.locator(".header__heading-logo");
    this.accountIcon = page.locator(".header__icon--account").nth(1);
    this.accountIconLink = page.locator(".header__icon--account").nth(1);
  }

  async verifyLogoIsVisible() {
    await expect(this.logoLink).toBeVisible();
  }

  async verifyLogoIsLinkToHomePage() {
    await expect(this.logoLink).toHaveAttribute("href", "/");
  }

  async verifyLogoImageIsVisible() {
    await expect(this.logoImage).toBeVisible();
  }

  async verifyLogoImageHasCorrectSize() {
    await expect(this.logoImage).toHaveAttribute("width", "180");
    await expect(this.logoImage).toHaveAttribute("height", "90.0");
  }
  async verifyLogoImageIsLinkToHomePage() {
    await expect(this.logoImage).toHaveAttribute("href", "/");
  }
  async verifyAccountIconIsVisible() {
    await expect(this.accountIcon).toBeVisible();
  }
  async verifyAccountIconIsLinkToAccountPage() {
    await expect(this.accountIcon).toHaveAttribute(
      "href",
      "/customer_authentication/redirect?locale=en&region_country=UA"
    );
  }
}
