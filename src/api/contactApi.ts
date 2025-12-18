import { ApiClient } from './apiClient';
import { Step } from '../allure_decorator/step';

export class ContactApi {
  constructor(private client: ApiClient) {}

  /**
   * POST /contacts
   * Create a new contact
   */
  @Step('[API] Create a contact')
  async addContact(
    token: string,
    contactPayload: {
      firstName: string;
      lastName: string;
      birthdate: string;
      email: string;
      phone: string;
      street1: string;
      street2?: string;
      city: string;
      stateProvince: string;
      postalCode: string;
      country: string;
    },
  ) {
    return this.client.post('/contacts', contactPayload, token);
  }

  /**
   * DELETE /contacts/{id}
   * Delete a contact by id
   */
  @Step('[API] Delete contact (id={1})')
  async deleteContact(token: string, contactId: string) {
    return this.client.delete(`/contacts/${contactId}`, token);
  }

  /**
   * GET /contacts/{id}
   * Get a contact by id
   */
  @Step('[API] Get a contact (id={1})')
  async getContact(token: string, contactId: string) {
    return this.client.get(`/contacts/${contactId}`, token);
  }
}
