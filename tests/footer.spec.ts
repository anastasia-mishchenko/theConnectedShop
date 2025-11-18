import { test, expect } from "@playwright/test";
import { Footer } from "../pages/Footer";
import { HomePage } from "../pages/HomePage";
import { footerTerms } from "../test-data/footerTerms";

test.describe("Check footer", () => {
  let homePage : HomePage;
  let footer: Footer;
  

  test.beforeEach(async ({ page }) => {
    footer = new Footer(page);
    homePage = new HomePage(page);
    await homePage.goto();
  });

  test ("[Footer][Positive] Verify all links are visible", async()=>{
    await footer.verifyFooterIsVisible();
    await footer.verifyOurStorySectionIsVisible();
    await footer.verifyAboutUsLinkIsVisible();
    await footer.verifyReviewsLinkIsVisible();
    await footer.verifyTechTalkLinkIsVisible();
    await footer.verifyContactInfoSectionIsVisible();
    await footer.verifyContactAddressIsVisible();
    await footer.verifyContactPhoneIsVisible();
    await footer.verifyContactEmailIsVisible();
    await footer.verifyNewsletterSectionIsVisible();
    await footer.verifyNewsletterInputIsVisible();
    await footer.verifyTermsOfServiceLinkIsVisible();
    await footer.verifyPrivacyPolicyLinkIsVisible();
    await footer.verifyContactUsLinkIsVisible();
    await footer.verifyFaqLinkIsVisible();
    await footer.verifySocialMediaLinksAreVisible();
    await footer.verifyCopyrightTextIsVisible();
    await footer.verifyCopyrightTextContainsYear();

  });
  test ("[Footer][Positive] Verify attributes of all links", async()=>{
    await footer.verifyAboutUsLinkHref();
    await footer.verifyReviewsLinkHref();
    await footer.verifyTechTalkLinkHref();
    await footer.verifyPressLinkHref();
    await footer.verifyBBBRatingLinkHref();
    await footer.verifyContactUsLinkHref();
    await footer.verifyFaqLinkHref();
  });

  test ("[Footer][Positive] Verify social media links are correct", async()=>{
    await footer.verifySocialMediaLinksAreVisible();
    await footer.verifySocialLinksAreCorrect();
  });

  test ("[Footer][Positive] Verify newsletter form", async()=>{
    await footer.verifyNewsletterSectionIsVisible();
    await footer.fillNewsletterEmail(footerTerms.emailValid);
    await footer.submitNewsletter();
    await footer.verifyAlertSuccessNewsletterIsVisible();
  });

  test ("[Footer][Negative] Verify newsletter form validation", async()=>{
    await footer.verifyNewsletterSectionIsVisible();
    await footer.fillNewsletterEmail(footerTerms.emailInvalid);
    await footer.submitNewsletter();
    const invalidEmailValidation = await footer.newsletterInput.evaluate(
        (el: HTMLInputElement) => el.validationMessage
      );
      console.log("Invalid email validation:", invalidEmailValidation);
      expect(invalidEmailValidation).not.toBe("");
  });
});