import {expect, type Locator, type Page, test} from '@playwright/test';

export class ContactsPage {
    readonly page: Page;
    readonly newContactButton: Locator;
    readonly createContactButton: Locator;
    readonly nameInputField: Locator;
    readonly nameInputErrorMessage: Locator;
    readonly successfulContactCreationMessage: Locator;
    readonly supplierNo: Locator;


    constructor(page: Page) {
        this.page = page;
        this.newContactButton = page.getByRole('button', { name: 'Ny kontakt' });
        this.createContactButton = page.getByRole('button', { name: 'Opprett kontakt'});
        this.nameInputField = page.getByRole('textbox', { name: 'Navn *' });
        this.nameInputErrorMessage = page.getByRole('alert').getByText('Vennligst skriv inn navn');
        this.successfulContactCreationMessage = page.getByText('Ny kontakt lagret.');
        this.supplierNo = page.getByRole('textbox', { name: 'Leverandørnr. *' })
    }

    /**
     * Click New Contact button.
     */
    async clickNewContactButton() {
        await this.newContactButton.click();
        await expect(this.nameInputField).toBeVisible();
        await expect(this.supplierNo).not.toBeEmpty()
    }

    /**
     * Click Create contact.
     */
    async clickCreateContact() {
        await this.createContactButton.click();
    }

    /**
     * Enters Contact name into field.
     * @param {string} contactName - contact name to input.
     */
    async inputContactName(contactName: string) {
        await this.nameInputField.fill(contactName);
    }

    /**
     * Asserts that Contact name error message is displayed.
     */
    async assertContactNameErrorMessageIsDisplayed() {
        await expect(this.nameInputErrorMessage).toBeVisible();
    }

    /**
     * Asserts that Contact creation successful message is displayed.
     */
    async assertSuccessfulContactCreationMessageIsDisplayed() {
        await expect(this.successfulContactCreationMessage).toBeVisible({ timeout: 15000 });
    }





}