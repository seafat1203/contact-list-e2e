import { test } from '../../src/fixtures/softAssertFixture';
import { ApiClient } from '../../src/api/apiClient';
import { AuthApi } from '../../src/api/authApi';

test('API - user can authenticate and receive token', async ({ request, sa }) => {
  const client = new ApiClient(request);
  const authApi = new AuthApi(client);

  const userEmail = process.env.TEST_USER_EMAIL || 'test.user@example.com';
  const userPassword = process.env.TEST_USER_PASSWORD || 'Password123!';

  const response = await authApi.login(userEmail, userPassword);

  await sa.assertEquals(200, response.status(), 'Login API should return HTTP 200');

  const responseBody = await response.json();

  // If you want to see failing assertions, uncomment the lines below
  // await sa.assertEquals(1, 999, 'This is a failing assertion for demonstration purposes');

  await sa.assertTrue(Boolean(responseBody.token), 'Authentication token should be returned');

  await sa.assertEquals(userEmail, responseBody.user.email, 'Returned user email should match login email');
});
