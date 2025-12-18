import { APIRequestContext } from '@playwright/test';
import { attachRequest, attachResponse } from './apiReporter';

/**
 * API client wrapper around Playwright APIRequestContext.
 *
 * Responsibilities:
 * - Centralize HTTP calls (GET / POST / DELETE)
 * - Automatically attach request & response to test reports
 * - Keep tests clean and focused on business logic
 */
export class ApiClient {
  constructor(private request: APIRequestContext) {}

  /**
   * Send a POST request and automatically attach request/response.
   *
   * Design choice:
   * - Token is masked in the report to avoid leaking sensitive data
   * - Real token is only used in the actual HTTP call
   */
  async post(url: string, data?: any, token?: string) {
    await attachRequest({
      method: 'POST',
      url,
      headers: token ? { Authorization: 'Bearer ***' } : undefined,
      body: data,
    });

    const response = await this.request.post(url, {
      data,
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });

    await this.attachResponseSafe(response);
    return response;
  }

  /**
   * Send a GET request with optional authentication.
   *
   * Why attach even for GET:
   * - Helps debugging unexpected backend behavior
   * - Makes API tests self-documented in the report
   */
  async get(url: string, token?: string) {
    await attachRequest({
      method: 'GET',
      url,
      headers: token ? { Authorization: 'Bearer ***' } : undefined,
    });

    const response = await this.request.get(url, {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });

    await this.attachResponseSafe(response);
    return response;
  }

  /**
   * Send a DELETE request.
   *
   * Typical usage:
   * - Cleanup steps
   * - Resource lifecycle validation
   */
  async delete(url: string, token?: string) {
    await attachRequest({
      method: 'DELETE',
      url,
      headers: token ? { Authorization: 'Bearer ***' } : undefined,
    });

    const response = await this.request.delete(url, {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });

    await this.attachResponseSafe(response);
    return response;
  }

  // ===== internal helpers =====

  /**
   * Safely attach the HTTP response to the report.
   *
   * Why this method exists:
   * - Some responses are not JSON (204, empty body, etc.)
   * - We never want reporting to break the test execution
   *
   * Strategy:
   * - Try to read JSON body
   * - Fallback to status-only attachment if parsing fails
   */
  private async attachResponseSafe(response: any) {
    try {
      const body = await response.clone().json();
      await attachResponse({
        status: response.status(),
        body,
      });
    } catch {
      await attachResponse({
        status: response.status(),
      });
    }
  }
}