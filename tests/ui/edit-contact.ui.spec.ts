import { test } from '../../src/fixtures/softAssertFixture';
import { StringUtils as SU } from '../../src/utils/stringUtils';
import { buildContact } from '../../src/data/contactBuilder';

import { LoginPage } from '../../src/pages/LoginPage';
import { ContactListPage } from '../../src/pages/ContactListPage';
import { CreateContactPage } from '../../src/pages/CreateContactPage';
import { ContactDetailsPage } from '../../src/pages/ContactDetailsPage';
import { EditContactPage } from '../../src/pages/EditContactPage';

test('UI - user can edit an existing contact and see updates in contact list', async ({ page, sa: softAssert }) => {
  const userEmail = process.env.TEST_USER_EMAIL || 'test.user@example.com';
  const userPassword = process.env.TEST_USER_PASSWORD || 'Password123!';

  const loginPage = new LoginPage(page);
  const contactListPage = new ContactListPage(page);
  const createContactPage = new CreateContactPage(page);
  const contactDetailsPage = new ContactDetailsPage(page);
  const editContactPage = new EditContactPage(page);

  let contact;
  let fullName: string;
  let previousLastName: string | null;

  await test.step('Given the user is logged in and has an existing contact', async () => {
    await loginPage.goto();
    await loginPage.login(userEmail, userPassword);
    await page.waitForURL('**/contactList');

    const firstName = 'UI';
    const lastName = `Edit-${SU.getRandomNumber(5)}`;
    const contactEmail = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`;

    contact = buildContact({
      firstName,
      lastName,
      email: contactEmail,
    });

    await contactListPage.clickAddNewContact();
    await createContactPage.fillContactForm(contact);
    await createContactPage.submit();
    await page.waitForURL('**/contactList');

    fullName = `${contact.firstName} ${contact.lastName}`;
  });

  await test.step('When the user edits the contact details', async () => {
    await contactListPage.openContact(fullName);

    await contactDetailsPage.waitForDetailsPageReady();
    previousLastName = await contactDetailsPage.getLastName();

    await contactDetailsPage.clickEditContact();
    await page.waitForURL('**/editContact');

    await editContactPage.waitForEditFormReady(previousLastName!);

    const updatedLastName = `${contact.lastName}-Updated`;
    const updatedCity = 'Lyon';

    await editContactPage.updateLastName(updatedLastName);
    await editContactPage.updateCity(updatedCity);
    await editContactPage.submit();
    await page.waitForURL('**/contactDetails');
  });

  await test.step('Then the updated contact information is visible', async () => {
    await contactDetailsPage.waitForLastNameUpdated(previousLastName!);

    await softAssert.assertEquals(
      `${contact.lastName}-Updated`,
      await contactDetailsPage.getLastName(),
      'Updated last name should be visible in contact details page',
    );
  });
});