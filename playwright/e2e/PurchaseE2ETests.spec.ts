import {test} from '@playwright/test';
import {DashboardPage} from "../page_object/DashboardPage";
import {BookingPage} from "../page_object/BookingPage";
import userData from "../config/userData.json";
import testData from "../config/testData.json";

test('Create purchase tests', async ({page}) => {

    await page.goto(userData.baseUrl);

    const dashboardPage = await new DashboardPage(page);
    await dashboardPage.waitDashboardPageToLoad();
    await dashboardPage.clickBookkeepingButton();
    await dashboardPage.clickPurchaseButton();
    const bookingPage = await new BookingPage(page);
    await bookingPage.fillDefaultOrderForm(testData)
    await bookingPage.clickBookButton()
    await bookingPage.assertSuccessMessage()
    await bookingPage.checkThatFormIsCleared(testData.contact)
});

test('Duplicate Invoice Number Handling test', async ({page}) => {

    await page.goto(userData.baseUrl);

    const dashboardPage = await new DashboardPage(page);

    await dashboardPage.waitDashboardPageToLoad();
    await dashboardPage.clickBookkeepingButton();
    await dashboardPage.clickPurchaseButton();
    const bookingPage = await new BookingPage(page);
    await bookingPage.fillDefaultOrderForm(testData)
    await bookingPage.inputInvoiceNumber(testData.invoice_number)
    await bookingPage.clickBookButton()
    await bookingPage.validateInvoiceNumberError()
    await bookingPage.checkThatFormIsNotCleared(testData.contact)
})