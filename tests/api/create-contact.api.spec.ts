import { test } from '../../src/fixtures/softAssertFixture';

import { ApiClient } from '../../src/api/apiClient';
import { ContactApi } from '../../src/api/contactApi';
import { AuthContext } from '../../src/auth/authContext';
import { buildContact } from '../../src/data/contactBuilder';
import { StringUtils as SU } from '../../src/utils/stringUtils';

test('API - user can add a contact', async ({ request, sa }) => {

  // Initialize API client and Contact API
  const client = new ApiClient(request);
  const contactApi = new ContactApi(client);

  // Retrieve authentication token via shared AuthContext
  const authContext = new AuthContext(request);
  const token = await authContext.getToken();

  // Prepare unique test data to avoid conflicts
  const firstName = 'API';
  const lastName = `Smith-${SU.getRandomNumber(4)}`;
  const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`;

  // Build a valid contact payload using defaults + overrides
  const newContact = buildContact({
    firstName,
    lastName,
    email,
  });


  // Create a new contact via API
  const createRes = await contactApi.addContact(token, newContact);
  const responseBody = await createRes.json();

  // Verify API response status
  await sa.assertEquals(201, createRes.status(), 'Create contact should return HTTP 201');

  // Verify returned contact data matches the input
  await sa.assertEquals(newContact.firstName, responseBody.firstName, 'First name should match input');

  await sa.assertEquals(newContact.lastName, responseBody.lastName, 'Last name should match input');

  await sa.assertEquals(newContact.email, responseBody.email, 'Email should match input');
});
