import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { ContactsPage } from "../pages/ContactsPage";
import { contactsTerms } from "../test-data/contactsTerms";

test.describe("Check contacts form", () => {
  let homePage: HomePage;
  let contactsPage: ContactsPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    contactsPage = new ContactsPage(page);
    await homePage.goto();
    // await .toHaveText - add
    await expect(contactsPage.contactsTabLink).toHaveText("Contact");
    await contactsPage.clickContactUsTab();
    await contactsPage.verifyContactsHeading();
  });

  test("[Contacts][Positive] Fill in the contacts form", async () => {
    await contactsPage.verifyPageTitle(contactsTerms.pageTitle);

    //Fill in the form
    await contactsPage.fillNameField(contactsTerms.nameText);
    await contactsPage.fillEmailField(contactsTerms.emailValid);
    await contactsPage.fillPhoneField(contactsTerms.phoneValid);
    await contactsPage.fillCommentField(contactsTerms.commentText);
    await contactsPage.submitContactForm();

    //Check if success alert is shown
    //await contactsPage.verifySuccessMessage();
  });

  test("[Contacts][Positive] Verify form fields attributes", async () => {
    await contactsPage.verifyFormFieldsAttributes();
  });

  test("[Contacts][Positive] Verify form fields are visible", async () => {
    await contactsPage.verifyFormFieldsAreVisible();
  });

  test("[Contacts][Positive] Verify email field is required", async () => {
    await contactsPage.verifyEmailFieldIsRequired();
  });

  test("[Contacts][Positive] Leave name field empty", async () => {
    await contactsPage.fillNameField("");
    await contactsPage.fillEmailField(contactsTerms.emailValid);
    await contactsPage.fillPhoneField(contactsTerms.phoneValid);
    await contactsPage.fillCommentField(contactsTerms.commentText);
    await contactsPage.submitContactForm();
    await contactsPage.verifySuccessMessage();
  });

  //    test('[Contacts][Negative] Check alerts')
  test("[Contacts][Negative] Check empty email alert", async () => {
    await contactsPage.verifyPageTitle(contactsTerms.pageTitle);
    await contactsPage.fillNameField(contactsTerms.nameText);
    await contactsPage.fillEmailField(contactsTerms.emailEmpty);
    await contactsPage.fillPhoneField(contactsTerms.phoneValid);
    await contactsPage.fillCommentField(contactsTerms.commentText);
    await contactsPage.submitContactForm();
    const emptyEmailValidation = await contactsPage.contactsFormEmailInput.evaluate(
      (el: HTMLInputElement) => el.validationMessage
    );
    console.log("Empty email validation:", emptyEmailValidation);
    expect(emptyEmailValidation).not.toBe("");
  });

  test("[Contacts][Negative] Check invalid email alert", async () => {
    await contactsPage.verifyPageTitle(contactsTerms.pageTitle);
    await contactsPage.fillNameField(contactsTerms.nameText);
    await contactsPage.fillEmailField(contactsTerms.emailInvalid);
    await contactsPage.fillPhoneField(contactsTerms.phoneValid);
    await contactsPage.fillCommentField(contactsTerms.commentText);
    await contactsPage.submitContactForm();
    const invalidEmailValidation = await contactsPage.contactsFormEmailInput.evaluate(
      (el: HTMLInputElement) => el.validationMessage
    );
    console.log("Invalid email validation:", invalidEmailValidation);
    expect(invalidEmailValidation).not.toBe("");
  });

  test("[Contacts][Negative] Check invalid phone alert", async () => {
    await contactsPage.verifyPageTitle(contactsTerms.pageTitle);
    await contactsPage.fillNameField(contactsTerms.nameText);
    await contactsPage.fillEmailField(contactsTerms.emailValid);
    await contactsPage.fillPhoneField(contactsTerms.phoneInvalid);
    await contactsPage.fillCommentField(contactsTerms.commentText);
    await contactsPage.submitContactForm();
    const invalidPhoneValidation = await contactsPage.contactsFormPhoneInput.evaluate(
      (el: HTMLInputElement) => el.validationMessage
    );
    console.log("Invalid phone validation:", invalidPhoneValidation);
    expect(invalidPhoneValidation).not.toBe("");
  });


  });

