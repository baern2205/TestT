Project structure:
    e2e - main directory with tests, tests grouped in classes by functionality tested
    page_object - directory with pages locators and functions, also have some facade methods to lighten test code
    config - directory with test data and config files, for now has only test data
    hooks - directory with common hooks to setup the tests, is not used in login tests, saves state in /artifact/authState.json

Uses playwright/TS/allure reports
Available scripts are in package.json

script to run:
    pnpm run pw:runall

script to generate allure report:
    pnpnm run allure:generate - allure report is put into /playwright/artifacts/allure-report/

script to open allure report from terminal:
    pnpm run allure:open

