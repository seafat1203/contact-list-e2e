type ContactOverrides = Partial<{
  firstName: string;
  lastName: string;
  birthdate: string;
  email: string;
  phone: string;
  street1: string;
  street2: string;
  city: string;
  stateProvince: string;
  postalCode: string;
  country: string;
}>;

export function buildContact(overrides: ContactOverrides = {}) {
  return {
    firstName: 'DEFAULT_FIRST_NAME',
    lastName: 'DEFAULT_LAST_NAME',
    birthdate: '1990-01-01',
    email: 'default.contact@test.local',
    phone: '87654321',
    street1: 'DEFAULT_STREET_1',
    street2: 'DEFAULT_STREET_2',
    city: 'DEFAULT_CITY',
    stateProvince: 'DEFAULT_STATE',
    postalCode: '00000',
    country: 'DEFAULT_COUNTRY',
    ...overrides,
  };
}
