// src/utils/softAssert.ts

import { test, type Page, type TestInfo } from '@playwright/test';

type Failure = {
  index: number;
  kind: string;
  expected: unknown;
  actual: unknown;
  message?: string;
};

export class SoftAssert {
  private failures: Failure[] = [];
  private total = 0;
  private index = 0;

  constructor(
    private testInfo?: TestInfo,
    private page?: Page,
  ) {}

  // ===== Assertions =====

  async assertEquals<T>(expected: T, actual: T, message?: string) {
    await this.run('Equals', expected, actual, expected === actual, message);
  }

  async assertNotEquals<T>(expected: T, actual: T, message?: string) {
    await this.run('NotEquals', expected, actual, expected !== actual, message);
  }

  async assertContains(expected: string, actual: string, message?: string) {
    await this.run('Contains', expected, actual, actual.includes(expected), message);
  }

  async assertTrue(actual: boolean, message?: string) {
    await this.run('IsTrue', true, actual, actual === true, message);
  }

  // ===== Final check =====

  async assertAll() {
    const failed = this.failures.length;

    // attach summary (always useful)
    if (this.testInfo) {
      await this.testInfo.attach('ASSETRTION SUMMARY', {
        body: Buffer.from(
          JSON.stringify(
            {
              total: this.total,
              passed: this.total - failed,
              failed,
            },
            null,
            2,
          ),
        ),
        contentType: 'application/json',
      });
    }

    if (failed === 0) return;

    const lines = this.failures.map(
      (f) =>
        `${f.index}. ❌ ${f.kind}\n` +
        `   Expected: ${this.stringify(f.expected)}\n` +
        `   Actual:   ${this.stringify(f.actual)}\n` +
        (f.message ? `   Message:  ${f.message}\n` : ''),
    );

    throw new Error(`Soft assertions failed (${failed}/${this.total})\n\n${lines.join('\n')}`);
  }

  // ===== Internal =====

  private async run(kind: string, expected: unknown, actual: unknown, pass: boolean, message?: string) {
    this.total++;
    this.index++;

    const title =
      `${pass ? '✅' : '❌'} [${this.index}] ${kind}` +
      (message ? ` — ${message}` : '') +
      ` | expected=${this.stringify(expected)}` +
      ` | actual=${this.stringify(actual)}`;

    await test.step(title, async () => {
      if (pass) return;

      // ❌ Failure path only below

      this.failures.push({
        index: this.index,
        kind,
        expected,
        actual,
        message,
      });

      // UI only: screenshot on failure
      if (this.page && this.testInfo) {
        try {
          const screenshot = await this.page.screenshot({ fullPage: true });
          await this.testInfo.attach(`Screenshot-${this.index}-${kind}`, {
            body: screenshot,
            contentType: 'image/png',
          });
        } catch {
          // never throw from soft assertion
        }
      }
    });
  }

  private stringify(value: unknown): string {
    try {
      if (typeof value === 'string') return value;
      return JSON.stringify(value);
    } catch {
      return String(value);
    }
  }
}
