# WebdriverIO E2E Automation Framework

This project contains an end-to-end (E2E) UI automation testing framework built using [WebdriverIO](https://webdriver.io/) and JavaScript. It utilizes the Mocha testing framework and follows the Page Object Model (POM) design pattern to ensure tests are maintainable, readable, and scalable.

## Features
- **WebdriverIO**: Core browser automation framework.
- **Mocha**: Test runner/framework.
- **Page Object Model (POM)**: Design pattern for structured and reusable test code.
- **Mochawesome Reporter**: Generates structured HTML and JSON test reports, automatically embedding screenshots for failing tests.
- **Chrome & ChromeDriver**: Pre-configured to run against local Chrome binaries.
- **ESLint & Prettier**: Standardized code linting and formatting.
- **Jenkins Integration**: Includes a `Jenkinsfile` and `wdio-job-config.xml` for seamless CI/CD pipeline integration.

## Prerequisites
- **Node.js** (v18 or higher recommended)
- **Google Chrome** (Tests are configured to use local Chrome instances, specifically tailored around v144)

## Setup & Installation

1. Clone the repository.
2. Navigate to the project root directory:
   ```bash
   cd wdio
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

## Running Tests

- **Run all tests (Standard)**:
  This script points to the default test runner task:
  ```bash
  npm test
  ```
  Or directly via WebdriverIO CLI:
  ```bash
  npx wdio run wdio.conf.js
  ```

- **Run tests in CI mode (Headless)**:
  ```bash
  npm run test:ci
  ```

## Viewing Test Reports
After a test execution, an HTML report is generated automatically. 
To view the results, open the following file in your browser:
```text
reports/wdio-report.html
```
*Note: If any test fails, a screenshot will be captured automatically and embedded directly within this HTML report.*

## Code Quality (Linting & Formatting)

Keep the code clean and properly formatted using ESLint and Prettier.

- **Check for lint errors**:
  ```bash
  npm run lint
  ```
- **Automatically fix lint/formatting issues**:
  ```bash
  npm run lint:fix
  ```