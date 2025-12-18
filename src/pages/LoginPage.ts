import { Page, Locator } from '@playwright/test';
import { Step } from '../../src/allure_decorator/step';

export class LoginPage {
  readonly page: Page;

  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.emailInput = page.getByPlaceholder('Email');
    this.passwordInput = page.getByPlaceholder('Password');
    this.submitButton = page.getByRole('button', { name: 'Submit' });
  }

  // ---------- navigation ----------

  @Step('Open login page')
  async goto() {
    await this.page.goto('https://thinking-tester-contact-list.herokuapp.com/login');
  }

  // ---------- actions ----------

  @Step('Fill email: {0}')
  async fillEmail(email: string) {
    await this.emailInput.fill(email);
  }

  @Step('Fill password: ***')
  async fillPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  @Step('Click submit button')
  async clickSubmit() {
    await this.submitButton.click();
  }

  // ---------- business action (flow) ----------

  async login(email: string, password: string) {
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.clickSubmit();
  }
}
