import { expect, type Locator, type Page } from '@playwright/test';

export class BookingPage {
    readonly page: Page;
    readonly homeButton: Locator;
    readonly selectContactField: Locator;
    readonly totalAmount: Locator;
    readonly invoiceDate: Locator;
    readonly dueDate: Locator;
    readonly accountSelectionButton: Locator;
    readonly bookButton: Locator;
    readonly successMessage: Locator;
    readonly invoiceNumber: Locator;
    readonly invoiceNumberError: Locator;


    constructor(page: Page) {
        this.page = page;
        this.homeButton = page.getByText('Selskapsoversikt')
        this.selectContactField = page.getByTestId('contact-select');
        // this.contactSelection = page.locator(`xpath =//*[@role="option"]//*[contains(text(), "${contactName}")]`)
        this.totalAmount = page.getByRole('textbox', {name: 'Totalt beløp inkl. mva. *'});
        this.invoiceDate = page.getByRole('button', {name: 'Fakturadato *'});
        this.dueDate = page.getByRole('button', {name: 'Forfallsdato'});
        this.accountSelectionButton = page.getByTestId('account-select');
        this.bookButton = page.getByRole('button', {name: ' Bokfør ', exact: true});
        this.successMessage = page.getByText("Bilag opprettet med bilagsnr.");
        this.invoiceNumber = page.getByRole('textbox', {name: 'Fakturanr.'});
        this.invoiceNumberError = page.getByRole('alert').filter({hasText: 'Fakturanr. er allerede bokført'})
        // page.locator('xpath = //*[contains(text(), "Fakturanr. er allerede bokført")]/a[contains(text(), "2024-1")]')
    }

    /**
     * Wait page to load.
     */
    async waitBookingPageToLoad() {
        await expect(this.selectContactField).toBeVisible({timeout: 15000});
    }

    /**
     * Creates order with default fields.
     * @private
     */
    async fillDefaultOrderForm(testData) {
        await this.selectContact(testData.contact);
        await this.inputTotalAmount(testData.total_amount);
        await this.inputInvoiceDate(testData.invoice_date);
        await this.inputDueDate(testData.due_date);
        await this.selectAccount(testData.account);
    }

    /**
     * Selects contact.
     * @param {string} contactName - string name of desired contact to choose.
     */
    async selectContact(contactName: string) {
        const contactLocator = `xpath =//*[@role="option"]//*[contains(text(), "${contactName}")]`;
        await this.selectContactField.click();
        await this.page.locator(contactLocator).scrollIntoViewIfNeeded();
        await this.page.locator(contactLocator).click();
    }

    /**
     * Inputs Total Amount.
     * @param {string} totalAmount - total amount to input in number format.
     *
     */
    async inputTotalAmount(totalAmount: string) {
        await this.totalAmount.fill(totalAmount);
    }

    /**
     * Inputs Invoice Date.
     * @param {string} date - date to input, should be in dd.mm.yyyy format
     */
    async inputInvoiceDate(date: string) {
        await this.invoiceDate.fill(date, {force: true});
    }

    /**
     * Inputs Due Date.
     * @param {string} date - date to input, should be in dd.mm.yyyy format
     */
    async inputDueDate(date: string) {
        await this.dueDate.fill(date, {force: true});
    }

    /**
     * Selects account.
     * @param {string} accountName - account name to select.
     */
    async selectAccount(accountName: string) {
        const accountLocator = `xpath =//*[@class="v-list-item__title"][contains(text(), "${accountName}")]`;
        await this.accountSelectionButton.click()
        await this.page.locator(accountLocator).scrollIntoViewIfNeeded();
        await this.page.locator(accountLocator).click();
    }

    /**
     * Clicks Book button.
     */
    async clickBookButton() {
        await this.bookButton.click();
    }

    /**
     * Validates that success message is displayed.
     */
    async assertSuccessMessage() {
        await expect(this.successMessage).toBeVisible({timeout: 15000});
    }

    /**
     * Checks that form is cleared by asseerting that Contact field is empty.
     * @param {string} contactName - contact name to check. Element with it should not exist.
     */
    async checkThatFormIsCleared(contactName: string) {
        const contactLocator = `xpath = //label/following-sibling::*//*[contains(text(), "${contactName}")]`;
        await expect(this.page.locator(contactLocator)).toHaveCount(0);
    }

    /**
     * Inputs invoice number.
     * @param invoiceNumber - invoice number to input
     */
    async inputInvoiceNumber(invoiceNumber: string) {
        await this.invoiceNumber.fill(invoiceNumber)
    }

    /**
     * Validates invoice number error after form submission.
     */
    async validateInvoiceNumberError() {
        await expect(this.invoiceNumberError).toBeVisible()
    }

    /**
     * Checks that form is not cleared after fail.
     * @param {string} contactName - contact name to check. Element with it should not exist.
     */
    async checkThatFormIsNotCleared(contactName: string) {
        const contactLocator = `xpath = //label/following-sibling::*//*[contains(text(), "${contactName}")]`;
        await expect(this.page.locator(contactLocator)).toBeVisible();
    }

}
