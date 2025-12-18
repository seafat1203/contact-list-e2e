import { APIRequestContext } from '@playwright/test';
import { ApiClient } from '../api/apiClient';
import { AuthApi } from '../api/authApi';

export class AuthContext {
  private token?: string;

  constructor(private request: APIRequestContext) {}

  async getToken(): Promise<string> {
    // if token already exists, return it directly
    if (this.token) {
      return this.token;
    }

    const client = new ApiClient(this.request);
    const authApi = new AuthApi(client);

    const response = await authApi.login(
      process.env.TEST_USER_EMAIL || 'test.user@example.com',
      process.env.TEST_USER_PASSWORD || 'Password123!',
    );

    const body = await response.json();

    const token = body.token;

    // ensure if token is present
    if (!token) {
      throw new Error('Authentication failed: token not returned by API');
    }

    this.token = token;
    return token;
  }
}
