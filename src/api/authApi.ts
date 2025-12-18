import { Step } from '../allure_decorator/step';
import { ApiClient } from './apiClient';

export class AuthApi {
  constructor(private apiClient: ApiClient) {}

  @Step('API: User login')
  async login(email: string, password: string) {
    return this.apiClient.post('/users/login', {
      email,
      password,
    });
  }
}
