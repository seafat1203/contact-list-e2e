import { Page, Locator } from '@playwright/test';
import { Step } from '../../src/allure_decorator/step';

export class RegisterPage {
  readonly page: Page;

  // locators
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.firstNameInput = page.getByPlaceholder('First Name');
    this.lastNameInput = page.getByPlaceholder('Last Name');
    this.emailInput = page.getByPlaceholder('Email');
    this.passwordInput = page.getByPlaceholder('Password');
    this.submitButton = page.getByRole('button', { name: 'Submit' });
  }

  @Step('Open registration page')
  async goto() {
    await this.page.goto('https://thinking-tester-contact-list.herokuapp.com/addUser');
  }

  @Step('Fill first name: {0}')
  async fillFirstName(value: string) {
    await this.firstNameInput.fill(value);
  }

  @Step('Fill last name: {0}')
  async fillLastName(value: string) {
    await this.lastNameInput.fill(value);
  }

  @Step('Fill email: {0}')
  async fillEmail(value: string) {
    await this.emailInput.fill(value);
  }

  @Step('Fill password')
  async fillPassword(value: string) {
    await this.passwordInput.fill(value);
  }

  @Step('Submit registration form')
  async submit() {
    await this.submitButton.click();
  }


  async register(user: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) {
    await this.fillFirstName(user.firstName);
    await this.fillLastName(user.lastName);
    await this.fillEmail(user.email);
    await this.fillPassword(user.password);
    await this.submit();
  }
}