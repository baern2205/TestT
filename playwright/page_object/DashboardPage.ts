import { expect, type Locator, type Page } from '@playwright/test';

export class DashboardPage {
    readonly page: Page;
    readonly homeButton: Locator;
    readonly bookkeepingButton: Locator;
    readonly purchaseButton: Locator;
    readonly contactsButton:Locator;


    constructor(page: Page) {
        this.page = page;
        this.homeButton = page.getByText('Selskapsoversikt')
        this.bookkeepingButton = page.getByRole('button', { name: 'Bokføring' });
        this.purchaseButton = page.getByRole('link', { name: 'Bokfør andre filer' });
        this.contactsButton = page.getByRole('link', { name: 'Kontakter' });
    }

    /**
     * Wait page to load.
     */
    async waitDashboardPageToLoad() {
        await expect(this.homeButton).toBeVisible({ timeout: 15000 });
    }

    /**
     * Clicks Bookkeeping button.
     */
    async clickBookkeepingButton() {
        await this.bookkeepingButton.click({force: true})
    }

    /**
     * Clicks purchase button.
     */
    async clickPurchaseButton() {
        await this.purchaseButton.click();
    }

    /**
     * Clicks contact button.
     */

    async clickContactsButton() {
        await this.contactsButton.click();
    }
}