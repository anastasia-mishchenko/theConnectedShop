import { expect, Locator, Page } from "@playwright/test";
import { contactsTerms } from "../tests/contactsTerms";

export class ContactsPage {
  readonly page: Page;
  readonly contactsHeading: Locator;
  readonly contactsTabLink: Locator;
  readonly contactsForm: Locator;

  // Form fields
  readonly contactsFormNameInput: Locator;
  readonly contactsFormEmailInput: Locator;
  readonly contactsFormPhoneInput: Locator;
  readonly contactsFormCommentInput: Locator;

  // Alert success
  readonly alertSuccess: Locator;

  // Send button
  readonly sendButton: Locator;

  constructor(page: Page) {
    // Page elements
    this.page = page;
    this.contactsHeading = page.locator(".title__heading");
    this.contactsTabLink = page.locator(contactsTerms.tabLink);
    this.contactsForm = page.locator(".contact");

    // Form fields
    this.contactsFormNameInput = page.locator(contactsTerms.nameInput);
    this.contactsFormEmailInput = page.locator(contactsTerms.emailInput);
    this.contactsFormPhoneInput = page.locator(contactsTerms.phoneInput);
    this.contactsFormCommentInput = page.locator(contactsTerms.commentInput);

    // Alert success
    this.alertSuccess = page.locator(contactsTerms.alertSuccess);

    // Send button
    this.sendButton = page.getByRole("button", { name: "Send" });
  }

  async goto() {
    await this.page.goto("/pages/contact-us");
  }

  async verifyPageTitle() {
    await expect(this.page).toHaveTitle(contactsTerms.pageTitle);
  }

  async verifyContactsHeading() {
    await expect(this.contactsHeading).toBeVisible();
  }

  async verifyContactsTabLink() {
    await expect(this.contactsTabLink).toBeVisible();
  }

  async verifyContactsTabLinkIsLinkToContactsPage() {
    await expect(this.contactsTabLink).toHaveAttribute(
      "href",
      "/pages/contact-us"
    );
  }

  async verifyContactsForm() {
    await expect(this.contactsForm).toBeVisible();
  }

  async verifyFormFieldsAreVisible() {
    await expect(this.contactsFormNameInput).toBeVisible();
    await expect(this.contactsFormEmailInput).toBeVisible();
    await expect(this.contactsFormPhoneInput).toBeVisible();
    await expect(this.contactsFormCommentInput).toBeVisible();
    await expect(this.sendButton).toBeVisible();
  }

  async verifyEmailFieldIsRequired() {
    await expect(this.contactsFormEmailInput).toHaveAttribute("required", "");
  }

  async fillNameField(name: string) {
    await this.contactsFormNameInput.fill(name);
  }

  async fillEmailField(email: string) {
    await this.contactsFormEmailInput.fill(email);
  }

  async fillPhoneField(phone: string) {
    await this.contactsFormPhoneInput.fill(phone);
  }

  async fillCommentField(comment: string) {
    await this.contactsFormCommentInput.fill(comment);
  }

  async fillContactForm(
    name: string,
    email: string,
    phone: string,
    comment: string
  ) {
    await this.fillNameField(name);
    await this.fillEmailField(email);
    await this.fillPhoneField(phone);
    await this.fillCommentField(comment);
  }

  async submitContactForm() {
    await this.sendButton.click();
  }

  // async verifyFormFieldValue(field: "name" | "email" | "phone" | "comment", value: string) {
  //     const fieldMap = {
  //         name: this.contactsFormNameInput,
  //         email: this.contactsFormEmailInput,
  //         phone: this.contactsFormPhoneInput,
  //         comment: this.contactsFormCommentInput
  //     };
  //     await expect(fieldMap[field]).toHaveValue(value);
  // }

  async verifySuccessMessage() {
    await expect(this.alertSuccess).toBeVisible();
  }
}
