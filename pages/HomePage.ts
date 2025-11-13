import { expect, Page } from "@playwright/test";

export class HomePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto("/");
  }

  async verifyPageTitle() {
    await expect(this.page).toHaveTitle(
      "The Connected Shop - Smart Locks, Smart Sensors, Smart Home & Office"
    );
  }

  async verifyCurrentUrl() {
    await expect(this.page).toHaveURL("/");
  }
}
