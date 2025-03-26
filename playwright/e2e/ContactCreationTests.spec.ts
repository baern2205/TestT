import {test} from '@playwright/test';
import userData from "../config/userData.json";
import {DashboardPage} from "../page_object/DashboardPage";
import {ContactsPage} from "../page_object/ContactsPage";
import testData from "../config/testData.json"

test('Contact Creation - Error Validation', async ({page}) => {
    await page.goto(userData.baseUrl);

    const dashboardPage = await new DashboardPage(page);
    await dashboardPage.waitDashboardPageToLoad();
    await dashboardPage.clickContactsButton()

    const contactsPage = await new ContactsPage(page);
    await contactsPage.clickNewContactButton()
    await contactsPage.clickCreateContact()
    await contactsPage.assertContactNameErrorMessageIsDisplayed()
});

test('Contact Creation - Positive Test', async ({page}) => {
    await page.goto(userData.baseUrl);

    const dashboardPage = await new DashboardPage(page);
    await dashboardPage.waitDashboardPageToLoad();
    await dashboardPage.clickContactsButton()

    const contactsPage = await new ContactsPage(page);
    await contactsPage.clickNewContactButton()
    await contactsPage.inputContactName(testData.contact_name)
    await contactsPage.clickCreateContact()
    await contactsPage.assertSuccessfulContactCreationMessageIsDisplayed()
});