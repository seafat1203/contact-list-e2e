import { test } from '../../src/fixtures/softAssertFixture';
import { StringUtils as SU } from '../../src/utils/StringUtils';
import { buildContact } from '../../src/data/contactBuilder';
import { LoginPage } from '../../src/pages/LoginPage';
import { CreateContactPage } from '../../src/pages/CreateContactPage';

test('UI - user can create a new contact and see it in contact list', async ({ page, sa: softAssert }) => {
  // --- Given: user is logged in ---
  const email = 'junyang.zhao1203@gmail.com';
  const password = '6VMqUiHgkfYp@8';

  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login(email, password);
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

  
  await page.getByRole('button', { name: 'Add a New Contact' }).click();
  await createContactPage.fillContactForm(contact);
  await createContactPage.submit();

  // --- Then: contact appears in contact list ---
  await page.waitForURL('**/contactList');

  const fullName = `${contact.firstName} ${contact.lastName}`;

  const contactNameCell = page.getByRole('cell', { name: fullName });
  await contactNameCell.waitFor({ state: 'visible', timeout: 5000 });

  await softAssert.assertEquals(
    true,
    await contactNameCell.isVisible(),
    'New contact <full name> should be visible in contact list',
  );

  await softAssert.assertEquals(
    true,
    await page.getByText(contact.email).isVisible(),
    'New contact <email> should be visible in contact list',
  );

  await softAssert.assertEquals(
    true,
    await page.getByRole('button', { name: 'Add a New Contact' }).isVisible(),
    'Add New Contact button should still be visible',
  );
});