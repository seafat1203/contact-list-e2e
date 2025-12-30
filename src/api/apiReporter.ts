import { test } from '@playwright/test';

/**
 * Convert any JS object into a pretty-printed JSON buffer.
 * - Used for Playwright attachments (Allure / HTML report friendly)
 * - The `null, 2` makes the JSON readable in the report
 */
function toJson(data: unknown): Buffer {
  return Buffer.from(JSON.stringify(data, null, 2));
}

/**
 * Attach an HTTP request to the test report.
 *
 * Why:
 * - Helps debugging API tests when a test fails
 * - Allows reviewers to clearly see what was sent to the backend
 * - Avoids logging sensitive data directly to console
 */
export async function attachRequest(info: {
  method: string;
  url: string;
  headers?: Record<string, string>;
  body?: unknown;
}) {
  await test.info().attach('Request', {
    body: toJson(info),
    contentType: 'application/json',
  });
}

/**
 * Attach an HTTP response to the test report.
 *
 * Why:
 * - Makes test failures self-explanatory (status + response body)
 * - Useful for API/UI hybrid tests (UI action → API validation)
 * - Keeps request/response trace close to the test step
 */
export async function attachResponse(info: { status: number; body?: unknown }) {
  await test.info().attach('Response', {
    body: toJson(info),
    contentType: 'application/json',
  });
}
