import { Page, Locator } from '@playwright/test';
import { Step } from '../../src/allure_decorator/step';

export class ContactDetailsPage {
  readonly page: Page;

  // ----- locators -----
  readonly editContactButton: Locator;
  readonly firstNameText: Locator;
  readonly lastNameText: Locator;
  readonly cityText: Locator;

  constructor(page: Page) {
    this.page = page;

    this.editContactButton = page.locator('#edit-contact');
    this.firstNameText = page.locator('#firstName');
    this.lastNameText = page.locator('#lastName');
    this.cityText = page.locator('#city');
  }

  @Step('Click "Edit Contact" button')
  async clickEditContact() {
    await this.editContactButton.click();
  }

  @Step('Read first name from contact details')
  async getFirstName(): Promise<string | null> {
    return this.firstNameText.textContent();
  }

  @Step('Read last name from contact details')
  async getLastName(): Promise<string | null> {
    return this.lastNameText.textContent();
  }

  @Step('Read city from contact details')
  async getCity(): Promise<string | null> {
    return this.cityText.textContent();
  }

  @Step('Wait until contact details page is loaded')
  async waitForDetailsPageReady() {
    await this.lastNameText.waitFor({ state: 'visible' });
  }

  @Step('Wait until last name value is updated')
  async waitForLastNameUpdated(previousValue: string) {
    await this.page.waitForFunction((oldValue) => {
      const el = document.querySelector('#lastName');
      if (!el) return false;

      const text = el.textContent?.trim();
      return !!text && text !== oldValue;
    }, previousValue);
  }

  @Step('Wait until city value changes')
  async waitForCityToChange(previousValue: string) {
    await this.page.waitForFunction((oldValue) => {
      const el = document.querySelector('#city');
      return el && el.textContent !== oldValue;
    }, previousValue);
  }
}
