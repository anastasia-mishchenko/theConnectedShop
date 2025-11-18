import { expect, Page } from "@playwright/test";
import { Header } from "./Header";

export class HomePage {
  readonly page: Page;
  readonly header: Header;

  constructor(page: Page) {
    this.page = page;
    this.header = new Header(page);
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
