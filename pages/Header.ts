import { expect, Locator, Page } from "@playwright/test";

export class Header {
  // Page elements        
  readonly page: Page;
  readonly header: Locator;
  // Logo
  readonly logoLink: Locator;
  readonly logoImage: Locator;

  // Customer support number
  readonly customerSupportNumber: Locator;

  // Account icon
  readonly accountIcon: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = page.locator(".header");
    this.logoLink = page.locator(".header__heading-link");
    this.logoImage = page.locator(".header__heading-logo");
    this.accountIcon = page.locator(".header__icon--account").nth(1);
    this.customerSupportNumber = page.locator(".header__customer-support-region__button").nth(1)
  }

  async verifyHeaderIsVisible() {
    await expect(this.header).toBeVisible();
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
    await expect(this.logoLink).toHaveAttribute("href", "/");
  }
  async verifyAccountIconIsVisible() {
    await expect(this.accountIcon).toBeVisible();
  }
  async verifyAccountIconIsLinkToAccountPage() {
    await expect(this.accountIcon).toHaveAttribute(
      "href",
      "https://theconnectedshop.com/customer_authentication/redirect?locale=en&region_country=UA"
    );
  }
  async verifyCustomerSupportNumberIsVisible() {
    await expect(this.customerSupportNumber).toBeVisible();
  }
  async verifyCustomerSupportNumberIsCorrect() {
    await expect(this.customerSupportNumber).toHaveAttribute(
      "href",
      "tel:(305) 330-3424"
    );
  }
}
