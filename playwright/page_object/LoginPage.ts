import {expect, type Locator, type Page} from '@playwright/test';
import {DashboardPage} from "./DashboardPage";

export class LoginPage {
    readonly page: Page;
    readonly registerButton: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly loginErrorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.registerButton = page.getByRole('link', { name: 'Registrer deg' });
        this.emailInput = page.getByRole('textbox', { name: 'E-post' });
        this.passwordInput = page.getByRole('textbox', { name: 'Passord' });
        this.loginButton = page.getByRole('button', { name: 'Logg inn' });
        this.loginErrorMessage = page.getByText('Feil brukernavn / passord');

    }

    /**
     * Waits till login page is loaded.
     */
    async waitLoginPageToLoad() {
        await expect(this.registerButton).toBeVisible();
    }

    /**
     * Method to attempt to login. May be used in negative cases.
     * @param {string} login - login to input.
     * @param {string} password - password to input.
     */
    async loginAttempt(login: string, password: string) {
        await this.emailInput.fill(login);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    /**
     * Method to check that login Error message is dispalyed.
     */
    async checkErrorMessageIsVisible() {
        await expect(this.loginErrorMessage).toBeVisible();
    }

    /**
     * Method used for successful login. May be used in negative cases.
     * @param {string} login - login to input.
     * @param {string} password - password to input.
     */
    async login(login: string, password: string) {
        await this.emailInput.fill(login);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
        await new DashboardPage(this.page).waitDashboardPageToLoad()
    }

}