import { test } from '../../src/fixtures/softAssertFixture';

import { ApiClient } from '../../src/api/apiClient';
import { ContactApi } from '../../src/api/contactApi';
import { AuthContext } from '../../src/auth/authContext';
import { buildContact } from '../../src/data/contactBuilder';
import { StringUtils as SU } from '../../src/utils/stringUtils';

test('API - user can add a contact', async ({ request, sa }) => {
  // =========================
  // Arrange
  // =========================

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

  // =========================
  // Act
  // =========================

  // Create a new contact via API
  const createRes = await contactApi.addContact(token, newContact);
  const responseBody = await createRes.json();

  // =========================
  // Assert (Soft Assertions)
  // =========================

  // Verify API response status
  await sa.assertEquals(
    String(createRes.status()),
    '201',
    'Create contact should return HTTP 201',
  );

  // Verify returned contact data matches the input
  await sa.assertEquals(
    responseBody.firstName,
    newContact.firstName,
    'First name should match input',
  );

  await sa.assertEquals(
    responseBody.lastName,
    newContact.lastName,
    'Last name should match input',
  );

  await sa.assertEquals(
    responseBody.email,
    newContact.email,
    'Email should match input',
  );
});