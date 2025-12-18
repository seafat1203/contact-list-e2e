import { Page, Locator } from '@playwright/test';
import { Step } from '../../src/allure_decorator/step';

export class ContactListPage {
  readonly page: Page;

  readonly addNewContactButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addNewContactButton = page.getByRole('button', { name: 'Add a New Contact' });
  }

  // ---------- actions ----------

  @Step('Click "Add a New Contact" button')
  async clickAddNewContact() {
    await this.addNewContactButton.click();
  }

  // ---------- queries ----------

  private contactNameCell(fullName: string): Locator {
    return this.page.getByRole('cell', { name: fullName });
  }

  @Step('Check if "Add a New Contact" button is visible')
  async isAddNewContactButtonVisible(): Promise<boolean> {
    return this.addNewContactButton.isVisible();
  }

  @Step('Wait for contact "{0}" to appear in contact list')
  async waitForContactVisible(fullName: string) {
    await this.contactNameCell(fullName).waitFor({ state: 'visible', timeout: 5000 });
  }

  @Step('Check if contact "{0}" is visible in contact list')
  async isContactVisible(fullName: string): Promise<boolean> {
    return this.contactNameCell(fullName).isVisible();
  }

  @Step('Click contact "{0}" in contact list')
  async openContact(fullName: string) {
    await this.contactNameCell(fullName).click();
  }

  @Step('Check if contact email "{0}" is visible in contact list')
  async isContactEmailVisible(email: string): Promise<boolean> {
    return this.page.getByText(email).isVisible();
  }

  @Step('Check if logout button is visible')
  async isLogoutVisible(): Promise<boolean> {
    return this.page.locator('#logout').isVisible();
  }
}
