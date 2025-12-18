# Playwright Automated Test Project

## Overview

This project is an automated test suite built with **Playwright**, covering both **API** and **UI** tests.

The focus of this project is:

- a clear test structure
- a shared assertion and reporting system
- readable test reports for everyone

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
- As the target system is simple, I did not introduce a BasePage abstraction to avoid unnecessary complexity
- Test files describe business scenarios instead of UI implementation details
- Assertions are executed through a shared **Soft Assertion** system

## API Test Design

API tests validate backend behavior and data consistency.

Important points:

- API tests reuse the **same Soft Assertion system** as UI tests
- Assertions follow the same reporting and failure collection logic

## Soft Assertion Design

A custom **Soft Assertion** mechanism is implemented and shared by both API and UI tests.

Main behavior:

- When an assertion fails, the test does **NOT STOP**
- The failure is recorded with its context and screenshot(API tests currently attach an empty screenshot, which can be optimized later)

At the end of the test:

- All assertion failures are summarized
- The test is marked as failed with a complete failure list

## Reporting

Test reporting is implemented using **Allure**.

Reporting is based on a custom **Step decorator**: @Step

- Each important action or assertion is wrapped in a step
- Steps appear clearly in the Allure report
- This makes test execution easy to follow

The goal is to clearly show:

- what the test did
- at which step it failed

#### How to run tests and view the Allure report locally ?

Note: Allure CLI must be installed locally to generate the report.

Install Allure (example on macOS):
brew install allure
allure --version

1. Run the tests:
   npx playwright test

2. Generate the report:
   allure generate allure-results --clean -o allure-report

3. Open the report:
   allure open allure-report

## Docker (optional)

This project can be also executed using Docker to simplify local setup and ensure a consistent execution environment.

#### Build the Docker image:

docker build -t contact-list-e2e .

#### Run all tests:

docker run --rm contact-list-e2e

#### If environment variables are required (e.g. credentials):

docker run --rm
-e TEST_USER_EMAIL=your_email
-e TEST_USER_PASSWORD=your_password
contact-list-e2e

Tests are executed sequentially to ensure stability and reproducibility for this exercise.

## Notes

- Authentication tests require credentials provided via environment variables (TEST_USER_EMAIL, TEST_USER_PASSWORD).
  In Github Action, these variables are configured as **GitHub Actions Secrets**.

- Parallel execution is intentionally disabled (workers = 1) to avoid data conflicts.

- A dedicated step-level framework is NOT introduced at the test layer, due to the limited scope of this exercise.

- TypeScript is configured via tsconfig.json.

- ESLint was intentionally NOT added to keep the setup lightweight.

- Test data is generated dynamically where needed (e.g. user registration) to avoid conflicts between test runs.

- Docker support is provided as an optional bonus to simplify local execution and ensure environment consistency.
