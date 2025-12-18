import { test } from '../../src/fixtures/softAssertFixture';
import { ApiClient } from '../../src/api/apiClient';
import { AuthApi } from '../../src/api/authApi';

test('API - user can authenticate and receive token', async ({ request, sa }) => {
  const client = new ApiClient(request);
  const authApi = new AuthApi(client);

  const userEmail = 'junyang.zhao1203@gmail.com';
  const userPassword = '6VMqUiHgkfYp@8';

  const response = await authApi.login(userEmail, userPassword);

  await sa.assertEquals(String(response.status()), '200', 'Login API should return HTTP 200');

  const responseBody = await response.json();

  // await sa.assertEquals(1, 999, 'This is a failing assertion for demonstration purposes');

  await sa.assertTrue(Boolean(responseBody.token), 'Authentication token should be returned');

  await sa.assertEquals(responseBody.user.email, userEmail, 'Returned user email should match login email');

  // await sa.assertEquals("1", "2", 'This is a 2nd failing assertion for demonstration purposes');

});
