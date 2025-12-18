import { Page, Locator } from '@playwright/test';
import { Step } from '../../src/allure_decorator/step';

export class CreateContactPage {
  readonly page: Page;

  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly birthdateInput: Locator;
  readonly emailInput: Locator;
  readonly phoneInput: Locator;
  readonly street1Input: Locator;
  readonly street2Input: Locator;
  readonly cityInput: Locator;
  readonly stateInput: Locator;
  readonly postalCodeInput: Locator;
  readonly countryInput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.firstNameInput = page.getByRole('textbox', { name: '* First Name:' });
    this.lastNameInput = page.getByRole('textbox', { name: '* Last Name:' });
    this.birthdateInput = page.getByRole('textbox', { name: 'Date of Birth:' });
    this.emailInput = page.getByRole('textbox', { name: 'Email:' });
    this.phoneInput = page.getByRole('textbox', { name: 'Phone:' });
    this.street1Input = page.getByRole('textbox', { name: 'Street Address 1:' });
    this.street2Input = page.getByRole('textbox', { name: 'Street Address 2:' });
    this.cityInput = page.getByRole('textbox', { name: 'City:' });
    this.stateInput = page.getByRole('textbox', { name: 'State or Province:' });
    this.postalCodeInput = page.getByRole('textbox', { name: 'Postal Code:' });
    this.countryInput = page.getByRole('textbox', { name: 'Country:' });
    this.submitButton = page.getByRole('button', { name: 'Submit' });
  }

  // --------- atomic actions ---------

  @Step('Fill first name: {0}')
  async fillFirstName(value: string) {
    await this.firstNameInput.fill(value);
  }

  @Step('Fill last name: {0}')
  async fillLastName(value: string) {
    await this.lastNameInput.fill(value);
  }

  @Step('Fill birthdate: {0}')
  async fillBirthdate(value: string) {
    await this.birthdateInput.fill(value);
  }

  @Step('Fill email: {0}')
  async fillEmail(value: string) {
    await this.emailInput.fill(value);
  }

  @Step('Fill phone: {0}')
  async fillPhone(value: string) {
    await this.phoneInput.fill(value);
  }

  @Step('Fill street address 1')
  async fillStreet1(value: string) {
    await this.street1Input.fill(value);
  }

  @Step('Fill street address 2')
  async fillStreet2(value: string) {
    await this.street2Input.fill(value);
  }

  @Step('Fill city: {0}')
  async fillCity(value: string) {
    await this.cityInput.fill(value);
  }

  @Step('Fill state or province: {0}')
  async fillState(value: string) {
    await this.stateInput.fill(value);
  }

  @Step('Fill postal code: {0}')
  async fillPostalCode(value: string) {
    await this.postalCodeInput.fill(value);
  }

  @Step('Fill country: {0}')
  async fillCountry(value: string) {
    await this.countryInput.fill(value);
  }

  @Step('Click submit contact form')
  async submit() {
    await this.submitButton.click();
  }

  // --------- composed action ---------

  async fillContactForm(contact: any) {
    await this.fillFirstName(contact.firstName);
    await this.fillLastName(contact.lastName);
    await this.fillBirthdate(contact.birthdate);
    await this.fillEmail(contact.email);
    await this.fillPhone(contact.phone);
    await this.fillStreet1(contact.street1);
    await this.fillStreet2(contact.street2);
    await this.fillCity(contact.city);
    await this.fillState(contact.stateProvince);
    await this.fillPostalCode(contact.postalCode);
    await this.fillCountry(contact.country);
  }
}
