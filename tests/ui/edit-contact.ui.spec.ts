import { test } from '../../src/fixtures/softAssertFixture';
import { StringUtils as SU } from '../../src/utils/stringUtils';
import { buildContact } from '../../src/data/contactBuilder';

import { LoginPage } from '../../src/pages/LoginPage';
import { ContactListPage } from '../../src/pages/ContactListPage';
import { CreateContactPage } from '../../src/pages/CreateContactPage';
import { ContactDetailsPage } from '../../src/pages/ContactDetailsPage';
import { EditContactPage } from '../../src/pages/EditContactPage';

test('UI - user can edit an existing contact and see updates in contact list', async ({ page, sa: softAssert }) => {
  // ---------- Given: user is logged in ----------
  const email = 'junyang.zhao1203@gmail.com';
  const password = '6VMqUiHgkfYp@8';

  const loginPage = new LoginPage(page);
  const contactListPage = new ContactListPage(page);
  const createContactPage = new CreateContactPage(page);
  const contactDetailsPage = new ContactDetailsPage(page);
  const editContactPage = new EditContactPage(page);

  await loginPage.goto();
  await loginPage.login(email, password);
  await page.waitForURL('**/contactList');

  // ---------- And: an existing contact ----------
  const firstName = 'UI';
  const lastName = `Edit-${SU.getRandomNumber(5)}`;
  const contactEmail = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`;

  const contact = buildContact({
    firstName,
    lastName,
    email: contactEmail,
  });

  await contactListPage.clickAddNewContact();
  await createContactPage.fillContactForm(contact);
  await createContactPage.submit();
  await page.waitForURL('**/contactList');

  const fullName = `${contact.firstName} ${contact.lastName}`;

  // ---------- When: user edits the existing contact ----------
  await contactListPage.openContact(fullName);

  await contactDetailsPage.waitForDetailsPageReady();
  const previousLastName = await contactDetailsPage.getLastName();

  await contactDetailsPage.clickEditContact();
  await page.waitForURL('**/editContact');

  await editContactPage.waitForEditFormReady(previousLastName!);

  const updatedLastName = `${contact.lastName}-Updated`;
  const updatedCity = 'Lyon';

  await editContactPage.updateLastName(updatedLastName);
  await editContactPage.updateCity(updatedCity);
  await editContactPage.submit();
  await page.waitForURL('**/contactDetails');

  // ---------- Then: updated contact is visible ----------
  await contactDetailsPage.waitForLastNameUpdated(previousLastName!); // another solution is to Use slowMO at 300 ms

  await softAssert.assertEquals(
    updatedLastName,
    await contactDetailsPage.getLastName(),
    'Updated last name should be visible in contact details page',
  );
});
