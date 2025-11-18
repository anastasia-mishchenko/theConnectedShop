import { expect, Locator, Page } from "@playwright/test";

export class Footer {
  readonly page: Page;
  readonly footer: Locator;

  // Our Story Section
  readonly ourStorySection: Locator;
  readonly aboutUsLink: Locator;
  readonly reviewsLink: Locator;
  readonly techTalkLink: Locator;
  readonly pressLink: Locator;

  // BBB Rating
  readonly bbbRating: Locator;

  // Contact Info
  readonly contactInfoSection: Locator;
  readonly contactAddress: Locator;
  readonly contactPhone: Locator;
  readonly contactEmail: Locator;

  // Newsletter
  readonly newsletterSection: Locator;
  readonly newsletterInput: Locator;
  readonly newsletterSubmitButton: Locator;
  readonly alertSuccessNewsletter: Locator;
  // Footer Links
  readonly termsOfServiceLink: Locator;
  readonly privacyPolicyLink: Locator;
  readonly shippingPolicyFooterLink: Locator;
  readonly refundPolicyFooterLink: Locator;
  readonly contactUsLink: Locator;
  readonly faqLink: Locator;

  // Social Media Links
  readonly xLink: Locator;
  readonly facebookLink: Locator;
  readonly pinterestLink: Locator;
  readonly instagramLink: Locator;
  readonly youtubeLink: Locator;
  readonly tiktokLink: Locator;
  readonly linkedinLink: Locator;

  // Copyright
  readonly copyrightText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.footer = page.locator(".footer");

    // Our Story Section
    this.ourStorySection = page.locator(".footer").getByText("Our Story");
    this.aboutUsLink = page.locator(".footer a[href='/pages/about-us']");
    this.reviewsLink = page.locator(".footer a[href='/pages/reviews']");
    this.techTalkLink = page.locator(".footer a[href='/blogs/tech-talk']");
    this.pressLink = page.locator(".footer a[href='/pages/press']");

    // BBB Rating
    this.bbbRating = page.locator("//div[@class='footer-block__details-content']//a");

    // Contact Info
    this.contactInfoSection = page.locator(".footer").getByText("Contact Info");
    this.contactAddress = page.locator(".footer").getByText("Miami Beach FL");
    this.contactPhone = page.locator(".footer").getByText("+1 305 330 3424");
    this.contactEmail = page
      .locator(".footer")
      .getByText("contact@theconnectedshop.com");

    // Newsletter
    this.newsletterSection = page.locator(".footer").getByText("Newsletter");
    this.newsletterInput = page.locator(".footer input[placeholder='Email']");
    this.newsletterSubmitButton = page.locator("#FooterSubscribe");
    this.alertSuccessNewsletter = page.locator("#Footer-Newsletter-success");
    // Footer Links
    this.termsOfServiceLink = page
      .locator(".footer")
      .getByRole("link", { name: /Terms of Service/i });
    this.privacyPolicyLink = page
      .locator(".footer")
      .getByRole("link", { name: /Privacy Policy/i });
    this.shippingPolicyFooterLink = page
      .locator(".footer")
      .getByRole("link", { name: /Shipping Policy/i });
    this.refundPolicyFooterLink = page
      .locator(".footer")
      .getByRole("link", { name: /Refund Policy/i });
    this.contactUsLink = page
      .locator(".footer")
      .getByRole("link", { name: /Contact us/i });
    this.faqLink = page.locator(".footer").getByRole("link", { name: /FAQ/i });

    // Social Media Links
    this.xLink = page
      .locator(".footer")
      .getByRole("link", { name: /Twitter/i });
    this.facebookLink = page
      .locator(".footer")
      .getByRole("link", { name: /Facebook/i }); 
    this.pinterestLink = page
      .locator(".footer")
      .getByRole("link", { name: /Pinterest/i });
    this.instagramLink = page
      .locator(".footer")
      .getByRole("link", { name: /Instagram/i });
    this.youtubeLink = page
      .locator(".footer")
      .getByRole("link", { name: /YouTube/i });
    this.tiktokLink = page
      .locator(".footer")
      .getByRole("link", { name: /TikTok/i });
    this.linkedinLink = page
      .locator(".footer")
      .getByRole("link", { name: /Linkedin/i });

    // Copyright
    this.copyrightText = page
      .locator(".footer")
      .getByText(/©.*The Connected Shop/i);
  }

  async verifyFooterIsVisible() {
    await expect(this.footer).toBeVisible();
  }

  async verifyOurStorySectionIsVisible() {
    await expect(this.ourStorySection).toBeVisible();
  }

  async verifyAboutUsLinkIsVisible() {
    await expect(this.aboutUsLink).toBeVisible();
  }

  async verifyReviewsLinkIsVisible() {
    await expect(this.reviewsLink).toBeVisible();
  }

  async verifyTechTalkLinkIsVisible() {
    await expect(this.techTalkLink).toBeVisible();
  }

  async verifyContactInfoSectionIsVisible() {
    await expect(this.contactInfoSection).toBeVisible();
  }

  async verifyContactAddressIsVisible() {
    await expect(this.contactAddress).toBeVisible();
  }

  async verifyContactPhoneIsVisible() {
    await expect(this.contactPhone).toBeVisible();
  }

  async verifyContactEmailIsVisible() {
    await expect(this.contactEmail).toBeVisible();
  }

  async verifyNewsletterSectionIsVisible() {
    await expect(this.newsletterSection).toBeVisible();
  }

  async verifyNewsletterInputIsVisible() {
    await expect(this.newsletterInput).toBeVisible();
  }

  async verifyTermsOfServiceLinkIsVisible() {
    await expect(this.termsOfServiceLink).toBeVisible();
  }

  async verifyPrivacyPolicyLinkIsVisible() {
    await expect(this.privacyPolicyLink).toBeVisible();
  }

  async verifyContactUsLinkIsVisible() {
    await expect(this.contactUsLink).toBeVisible();
  }

  async verifyFaqLinkIsVisible() {
    await expect(this.faqLink).toBeVisible();
  }

  async verifySocialMediaLinksAreVisible() {
    await expect(this.xLink).toBeVisible();
    await expect(this.facebookLink).toBeVisible();
    await expect(this.pinterestLink).toBeVisible();
    await expect(this.instagramLink).toBeVisible();
    await expect(this.youtubeLink).toBeVisible();
    await expect(this.tiktokLink).toBeVisible();
    await expect(this.linkedinLink).toBeVisible();
  }
  async verifySocialLinksAreCorrect() {
    await expect(this.xLink).toHaveAttribute("href", "https://twitter.com/_ConnectedShop");
    await expect(this.facebookLink).toHaveAttribute("href", "https://www.facebook.com/theconnectedshop");
    await expect(this.pinterestLink).toHaveAttribute("href", "https://www.pinterest.com/TheConnectedShop");
    await expect(this.instagramLink).toHaveAttribute("href", "https://www.instagram.com/theconnectedshop/");
    await expect(this.youtubeLink).toHaveAttribute("href", "https://www.youtube.com/channel/UC_GC3VbckW1qEcuyOqVSbvQ");
    await expect(this.tiktokLink).toHaveAttribute("href", "https://www.tiktok.com/@theconnectedshop");
    await expect(this.linkedinLink).toHaveAttribute("href", "https://www.linkedin.com/company/87133943/");
  }

  async verifyCopyrightTextIsVisible() {
    await expect(this.copyrightText).toBeVisible();
  }

  async verifyCopyrightTextContainsYear() {
    await expect(this.copyrightText).toContainText("2025");
  }

  async verifyAboutUsLinkHref() {
    await expect(this.aboutUsLink).toHaveAttribute("href", /\/about-us/i);
  }

  async verifyReviewsLinkHref() {
    await expect(this.reviewsLink).toHaveAttribute("href", /\/reviews/i);
  }
  async verifyTechTalkLinkHref() {
    await expect(this.techTalkLink).toHaveAttribute("href", /\/tech-talk/i);
  }
  async verifyPressLinkHref() {
    await expect(this.pressLink).toHaveAttribute("href", /\/press/i);
  }
  async verifyBBBRatingLinkHref() {
    await expect(this.bbbRating).toHaveAttribute("href", "https://www.bbb.org/us/fl/miami-beach/profile/ecommerce/connected-shop-inc-0633-92025167/#sealclick");
  }


  async verifyContactUsLinkHref() {
    await expect(this.contactUsLink).toHaveAttribute(
      "href",
      /\/pages\/contact-us/i
    );
  }

  async verifyFaqLinkHref() {
    await expect(this.faqLink).toHaveAttribute("href", /\/pages\/faqs/i);
  }

  async fillNewsletterEmail(email: string) {
    await this.newsletterInput.fill(email);
  }

  async submitNewsletter() {
    await this.newsletterSubmitButton.click();
  }

  async verifyAlertSuccessNewsletterIsVisible() {
    await expect(this.alertSuccessNewsletter).toBeVisible();
  }
}
