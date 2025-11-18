import { expect, Locator, Page } from "@playwright/test";
import { contactsTerms } from "../test-data/contactsTerms";

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

  async clickContactUsTab() {
    await this.contactsTabLink.click();
  }

  async verifyPageTitle(value: string) {
    await expect(this.page).toHaveTitle(value);
  }

  async verifyContactsHeading() {
    await expect(this.contactsHeading).toBeVisible();
  }

  async verifyContactsHeadingHasCorrectText() {
    await expect(this.contactsHeading).toHaveText(contactsTerms.headingText);
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

  // add check for fields attributes
  async verifyFormFieldsAttributes() {
    await expect(this.contactsFormNameInput).toHaveAttribute("name", "contact[Name]");
    await expect(this.contactsFormNameInput).toHaveAttribute("placeholder", "Name");
    await expect(this.contactsFormEmailInput).toHaveAttribute("type", "email");
    await expect(this.contactsFormEmailInput).toHaveAttribute("placeholder", "Email");
    await expect(this.contactsFormEmailInput).toHaveAttribute("name", "contact[email]");
    await expect(this.contactsFormEmailInput).toHaveAttribute("required", "required");
    await expect(this.contactsFormPhoneInput).toHaveAttribute("type", "tel");
    await expect(this.contactsFormPhoneInput).toHaveAttribute("name", "contact[Phone number]");
    await expect(this.contactsFormPhoneInput).toHaveAttribute("pattern", "[0-9\\-]*");
    await expect(this.contactsFormPhoneInput).toHaveAttribute("placeholder", "Phone number");
    await expect(this.contactsFormCommentInput).toHaveAttribute("placeholder", "Comment");
    await expect(this.contactsFormCommentInput).toHaveAttribute("name", "contact[Comment]");
  }

  async verifyFormFieldsAreVisible() {
    await expect(this.contactsFormNameInput).toBeVisible();
    await expect(this.contactsFormEmailInput).toBeVisible();
    await expect(this.contactsFormPhoneInput).toBeVisible();
    await expect(this.contactsFormCommentInput).toBeVisible();
    await expect(this.sendButton).toBeVisible();
  }

  async verifyEmailFieldIsRequired() {
    await expect(this.contactsFormEmailInput).toHaveAttribute("required", "required");
  }

  async fillNameField(name: string) {
    await this.contactsFormNameInput.fill(name);
    await expect(this.contactsFormNameInput).toHaveValue(name);
  }

  async fillEmailField(email: string) {
    await this.contactsFormEmailInput.fill(email);
    // Whitespace-only values get trimmed to empty string by the browser
    const expectedValue = email.trim() === "" ? "" : email;
    await expect(this.contactsFormEmailInput).toHaveValue(expectedValue);
  }

  async fillPhoneField(phone: string) {
    await this.contactsFormPhoneInput.fill(phone);
    await expect(this.contactsFormPhoneInput).toHaveValue(phone);
  }

  async fillCommentField(comment: string) {
    await this.contactsFormCommentInput.fill(comment);
    await expect(this.contactsFormCommentInput).toHaveValue(comment);
  }

  async fillContactForm(
    name: string,
    email: string,
    phone: string,
    comment: string
  ) {
    await this.fillNameField(name);
    await expect(this.contactsFormNameInput).toHaveValue(name);
    await this.fillEmailField(email);
    await expect(this.contactsFormEmailInput).toHaveValue(email);
    await this.fillPhoneField(phone);
    await expect(this.contactsFormPhoneInput).toHaveValue(phone);
    await this.fillCommentField(comment);
    await expect(this.contactsFormCommentInput).toHaveValue(comment);
  }

  async submitContactForm() {
    await this.sendButton.click();
  }

  async verifySuccessMessage() {
    await expect(this.alertSuccess).toBeVisible();
  }
}
