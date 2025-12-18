import { test } from '../../src/fixtures/softAssertFixture';
import { StringUtils as SU } from '../../src/utils/stringUtils';
import { buildContact } from '../../src/data/contactBuilder';
import { LoginPage } from '../../src/pages/LoginPage';
import { CreateContactPage } from '../../src/pages/CreateContactPage';
import { ContactListPage } from '../../src/pages/ContactListPage';

test('UI - user can create a new contact and see it in contact list', async ({ page, sa: softAssert }) => {
  // --- Given: user is logged in ---
  const userEmail = process.env.TEST_USER_EMAIL || 'test.user@example.com';
  const userPassword = process.env.TEST_USER_PASSWORD || 'Password123!';

  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login(userEmail, userPassword);
  await page.waitForURL('**/contactList');

  // --- When: user creates a new contact ---
  const firstName = 'UI';
  const lastName = `Test-${SU.getRandomNumber(4)}`;
  const contactEmail = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`;

  const contact = buildContact({
    firstName,
    lastName,
    email: contactEmail,
  });

  const createContactPage = new CreateContactPage(page);
  const contactListPage = new ContactListPage(page);

  await contactListPage.clickAddNewContact();
  await createContactPage.fillContactForm(contact);
  await createContactPage.submit();

  // --- Then: contact appears in contact list ---
  await page.waitForURL('**/contactList');

  const fullName = `${contact.firstName} ${contact.lastName}`;

  await contactListPage.waitForContactVisible(fullName);

  await softAssert.assertEquals(
    true,
    await contactListPage.isContactVisible(fullName),
    'New contact <full name> should be visible in contact list',
  );

  await softAssert.assertEquals(
    true,
    await contactListPage.isContactEmailVisible(contact.email),
    'New contact <email> should be visible in contact list',
  );

  await softAssert.assertEquals(
    true,
    await contactListPage.isAddNewContactButtonVisible(),
    'Add New Contact button should still be visible',
  );
});
