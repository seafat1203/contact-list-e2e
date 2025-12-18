import { test } from '../../src/fixtures/softAssertFixture';
import { RegisterPage } from '../../src/pages/RegisterPage';
import { ContactListPage } from '../../src/pages/ContactListPage';

test('UI - user can register and is redirected to contact list', async ({ page, sa: softAssert }) => {
  const registerPage = new RegisterPage(page);
  const contactListPage = new ContactListPage(page);

  const email = `test_${Date.now()}@gmail.com`;
  const password = 'Password123!';

  // --- Given: user registers ---
  await registerPage.goto();
  await registerPage.register({
    firstName: 'Test',
    lastName: 'User',
    email,
    password,
  });

  // --- Then: user is redirected to contact list ---
  await page.waitForURL('**/contactList');

  await softAssert.assertContains(
    '/contactList',
    page.url(),
    'User should be redirected to Contact List page after registration',
  );

  await softAssert.assertEquals(
    true,
    await contactListPage.isLogoutVisible(),
    'Logout button should be visible after registration',
  );
});