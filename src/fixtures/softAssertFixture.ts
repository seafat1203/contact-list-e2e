// src/fixtures/softAssertFixture.ts

import { test as base, type TestInfo } from '@playwright/test';
import { SoftAssert } from '../assertion/softAssert';

type Fixtures = {
  sa: SoftAssert;
};

export const test = base.extend<Fixtures>({
  sa: async ({ page }, use, testInfo: TestInfo) => {
    // Create SoftAssert with full context
    const sa = new SoftAssert(testInfo, page);

    // Run test body
    await use(sa);

    // Final check (may throw)
    await sa.assertAll();
  },
});

export { expect } from '@playwright/test';
