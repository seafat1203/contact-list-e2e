# Playwright Automated Test Project

## Overview

This project is an automated test suite built with **Playwright**, covering both **API** and **UI** tests.

The focus of this project is not only test coverage, but also:
- a clear test structure
- a shared assertion and reporting system
- readable test reports for the whole team


## Test Structure

Tests are separated by folders:
- API tests
- UI tests

Both API and UI tests share the same assertion and reporting mechanisms.

Tests are executed sequentially to ensure stability.


## UI Test Design

UI tests focus on validating real user scenarios.

Key design choices:
- Page Object Model (POM) is used to isolate locators and page actions
- Test files describe business scenarios instead of UI implementation details
- Assertions are executed through a shared **Soft Assertion** system

UI tests mainly validate:
- page navigation and redirections
- visible elements and user feedback
- business results from a user perspective


## API Test Design

API tests validate backend behavior and data consistency.

Important points:
- API tests reuse the **same Soft Assertion system** as UI tests
- Assertions follow the same reporting and failure collection logic
- The main difference with UI tests is the context, not the assertion design


## Reporting

Test reporting is implemented using **Allure**.

Reporting is based on a custom **Step decorator**:
- Each important action or assertion is wrapped in a step
- Steps appear clearly in the Allure report
- This makes test execution easy to follow, even for non-QA users

The goal is to clearly show:
- what the test did
- at which step it failed



## Soft Assertion Design

A custom **Soft Assertion** mechanism is implemented and shared by both API and UI tests.

Main behavior:
- When an assertion fails, the test does **not stop immediately**
- The failure is recorded with its context
- Test execution continues until the end

At the end of the test:
- All assertion failures are summarized
- The test is marked as failed with a complete failure list

Additional behavior:
- When an assertion fails, a screenshot is attached to the report
- This is mainly useful for UI tests
- API tests currently attach an empty screenshot, which can be optimized later

This design allows:
- better failure analysis
- fewer re-runs
- more useful test reports


## Notes

- Parallel: Parallel execution is not recommended to avoid data conflicts currently. 
- Step framwork: There is currently no dedicated step framework at the test level. This is intentional, as the project scope is small and test scenarios are simple.

