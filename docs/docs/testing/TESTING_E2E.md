---
id: e2e
slug: /testing/e2e
title: E2E Tests - Maestro
sidebar_position: 4
tags:
  - E2E
  - E2E Tests
  - Testing
  - Maestro
description: E2E Testing with Maestro
---

# E2E Testing with Maestro

## 1. Document Structure

This document is structured to provide a comprehensive guide on setting up and executing end-to-end (E2E) tests using Maestro in the BACA project. The main sections include:

- Installing Maestro
- Configuration process
- Running tests
- Explanation of YAML files
- Troubleshooting common issues
- Benefits and limitations of the E2E testing approach
- Best practices

This documentation is designed to be understandable and useful for both new and experienced developers, UI/UX designers, testers, and other team members involved in the project. Each section contains detailed information and practical examples to facilitate the implementation and execution of E2E tests within the context of BACA.

## 2. Configuration and Installation Process

### Installing Maestro

To install Maestro, follow these steps:

1. Ensure that Node.js is installed on your system.

2. Open a terminal in the project’s root directory.

3. Run the following command:

   ```
   yarn install-maestro
   ```

   This command is a custom npm script that executes:

   ```
   curl -Ls 'https://get.maestro.mobile.dev' | bash
   ```

   The script automatically downloads and installs Maestro on your system.

4. Verify the installation by running:
   ```
   maestro --version
   ```
   You should see the Maestro version if the installation was successful.

### Environment Setup

1. Expo Setup:

   - [Expo Setup Guide](https://docs.expo.dev/get-started/set-up-your-environment/)

2. Project Setup:

   - Ensure that all project dependencies are installed:

     ```
     yarn install
     ```

3. Mock Server Configuration:

   - Check that the `ENABLED_MOCKED_SERVER` environment variable is correctly configured in the `.env` file.

4. Maestro Studio Configuration (optional but recommended):
   - Maestro Studio provides a visual interface for creating and debugging E2E tests.

## 3. Running Tests

### Running All Tests

To run all E2E tests for BACA, follow these steps:

1. Start the mock server:

   ```
   yarn start:e2e
   ```

   It’s crucial that the mock server is enabled (ENABLED_MOCKED_SERVER) before running the tests.

2. In another terminal, start Maestro Studio for a visual testing experience (optional):

   ```
   maestro studio
   ```

3. In a new terminal, execute all tests using the following command:

   ```
   yarn test:e2e
   ```

### Running Individual Tests

To run a single test, use the following command format:

```
maestro test <path-to-yaml-file> -e APP_ID=host.exp.Exponent --debug-output=./e2e-debug-output
```

Replace `<path-to-yaml-file>` with the specific path to the test you want to run. For example:

- To run the login test:
  ```
  maestro test .maestro/auth/login-with-validation.yaml -e APP_ID=host.exp.Exponent --debug-output=./e2e-debug-output
  ```
- To run the full-screen form test:
  ```
  maestro test .maestro/home/full-screen-form.yaml -e APP_ID=host.exp.Exponent --debug-output=./e2e-debug-output
  ```

Ensure you are in the project’s root directory when executing these commands.

## 4. YAML File Explanation

Each YAML file in the .maestro directory represents a specific set of E2E tests. Here’s an explanation of each file’s function:

### logout-when-needed.yaml

Handles logging out the user if needed before running other tests. Includes:

- Stopping and restarting the app.
- Navigating to the login screen.
- Performing the logout flow if the user is authenticated.

### login-with-validation.yaml

Contains tests for the login process, including input validation. Tests include:

- Verifying the visibility of login screen elements.
- Testing email and password validation.
- Verifying the successful login process.

### details.yaml

Tests the functionality of the details screen, including:

- Navigating to the details screen.
- Interacting with specific UI elements.

### full-screen-form.yaml

Tests the full-screen form by performing actions such as:

- Filling out the form.
- Navigating through different sections of the form.
- Submitting the form and verifying the outcome.

### settings.yaml

Tests the functionality of the settings screen, including:

- Changing the app’s theme (light, dark, system).

### logout.yaml

Contains tests for the user logout process. Includes:

- Logging out the user.
- Verifying the return to the login screen after logout.

### config.yaml

Configures the global execution of tests, including:

- The order of test flow execution.
- Enabling specific tags for tests.
- Configuring whether to continue or stop on failure.

## 5. Troubleshooting Common Issues

- **Persistent session issue:** The logout-when-needed.yaml file automatically logs out if the home screen is visible, avoiding issues with previous sessions.
- **Login validation failures:** The login-with-validation.yaml file has been modified to include additional checks. Ensure that UI element IDs match those specified in the YAML file.
- **Language issues**: To avoid issues with text selection when switching languages, identifiers (testID) are used instead of text for UI elements. For example, use `testID='sign_in:submit_button'` instead of selecting by text.
- **Server synchronization:** The mock server provides faster and more reliable test execution, eliminating errors due to lack of synchronization between the server startup and immediate test execution.
- **Screen coordinate issues:** Specific coordinates are used for some interactions in full-screen-form.yaml. Ensure you use the same simulator or device to maintain consistency.

## 6. Benefits and Limitations

### Benefits

- **Early bug detection:** Helps identify issues on screens that haven’t been directly modified, preventing regressions.
- **Automation:** Allows running tests in the background while performing other development tasks.
- **Error prevention:** Helps catch issues before committing, improving code quality. For instance, when refactoring the test form, hiding error messages may result in a red rectangle instead of an error message. Re-running tests can reveal issues with component reuse, which the tool helps identify, increasing code reliability.
- **Living documentation:** E2E tests serve as a form of documentation that is updated alongside changes in the application.
- **Expo Go Compatibility:** Maestro works with regular apps already built on the device. This means we can skip slow native builds by using Expo Go with `yarn start:e2e`.
- **Scalability:** Maestro’s ability to handle large test suites without significant performance degradation.

### Limitations

- **Development time:** Creating and maintaining E2E tests increases initial development time.
- **Fragility:** UI-based tests can be sensitive to interface changes, requiring frequent updates.
- **Localization issues:** There may be difficulties selecting text when changing the application’s language.
- **Limited simulation:** Some functionalities, such as saving profile data, may not work correctly with the mock server, limiting the scope of tests.
- **Advanced features limitations:** Unlike other frameworks (e.g., Detox), Maestro may not support some advanced features like physical device manipulation or integration with external APIs for more realistic simulations.

## 7. Best Practices

1. **Regular maintenance:** Regularly update E2E tests to reflect changes in the application.
2. **Use unique IDs:** Use unique testIDs for UI elements to make tests more resilient.
3. **Atomic tests:** Design tests to be independent of each other for easier debugging.
4. **Version control:** Include Maestro YAML files in version control alongside application code.
5. **Documentation:** Keep this documentation up to date with any changes in the testing process or configuration.

### Additional Notes

- We are working on improving validation on screens such as ProfileScreen.
- We plan to implement more test cases for functionalities like Sign up and password validation.

For more information on Maestro and its usage in E2E testing, refer to the official Maestro documentation.
