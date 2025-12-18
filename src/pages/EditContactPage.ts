import { Page, Locator } from '@playwright/test';
import { Step } from '../../src/allure_decorator/step';

export class EditContactPage {
  readonly page: Page;

  readonly lastNameInput: Locator;
  readonly cityInput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.lastNameInput = page.locator('#lastName');
    this.cityInput = page.locator('#city');
    this.submitButton = page.getByRole('button', { name: 'Submit' });
  }

  @Step('Wait until edit contact form is fully initialized')
  async waitForEditFormReady(expectedInitialLastName: string) {
    await this.lastNameInput.waitFor({ state: 'visible' });

    await this.page.waitForFunction((expected) => {
      const input = document.querySelector('#lastName') as HTMLInputElement | null;
      return input !== null && input.value !== '' && input.value === expected;
    }, expectedInitialLastName);
  }

  @Step('Update last name to "{0}"')
  async updateLastName(value: string) {
    await this.lastNameInput.fill(value);
  }

  @Step('Update city to "{0}"')
  async updateCity(value: string) {
    await this.cityInput.fill(value);
  }

  @Step('Submit edit contact form')
  async submit() {
    await this.submitButton.click();
  }
}
