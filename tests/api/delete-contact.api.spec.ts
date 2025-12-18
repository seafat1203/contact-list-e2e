import { test } from '../../src/fixtures/softAssertFixture';

import { ApiClient } from '../../src/api/apiClient';
import { ContactApi } from '../../src/api/contactApi';
import { AuthContext } from '../../src/auth/authContext';
import { buildContact } from '../../src/data/contactBuilder';
import { StringUtils as SU } from '../../src/utils/stringUtils';

test('API - user can delete a contact', async ({ request, sa }) => {

  // Initialize API client and Contact API
  const client = new ApiClient(request);
  const contactApi = new ContactApi(client);

  // Retrieve authentication token
  const authContext = new AuthContext(request);
  const token = await authContext.getToken();

  // Prepare unique test data for the contact
  const firstName = 'Temp';
  const lastName = `User-${SU.getRandomNumber(4)}`;
  const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`;

  // Build a valid contact payload
  const contactToDelete = buildContact({
    firstName,
    lastName,
    email,
  });

  // Create a contact first
  const createRes = await contactApi.addContact(token, contactToDelete);
  // Verify contact creation succeeded
  await sa.assertEquals(201, createRes.status(), 'Create contact should return HTTP 201');

  const createdContact = await createRes.json();
  const contactId = createdContact._id;

  // Delete the previously created contact via API
  const deleteRes = await contactApi.deleteContact(token, contactId);

  // Verify contact deletion succeeded
  await sa.assertEquals(200, deleteRes.status(), 'Delete contact should return HTTP 200');

  // Verify the deleted contact is no longer accessible
  const getRes = await contactApi.getContact(token, contactId);

  await sa.assertEquals(404, getRes.status(), 'Getting a deleted contact should return HTTP 404');
});
