import {test} from '@playwright/test';
import {LoginPage} from "../page_object/LoginPage";
import userData from "../config/userData.json";

const newLoginUrl = new URL(userData.baseUrl);
newLoginUrl.pathname = "/login";

test('Positive login test', async ({page}) => {

    await page.goto(newLoginUrl.href);

    const loginPage = await new LoginPage(page);
    await loginPage.waitLoginPageToLoad();
    await loginPage.login(userData.username,userData.password);
});

test('Negative login test', async ({page}) => {

    await page.goto(newLoginUrl.href);

    const loginPage = await new LoginPage(page);
    await loginPage.waitLoginPageToLoad();
    await loginPage.loginAttempt("wrongemail@noemail.com", "justsomerandompassword12345");
    await loginPage.checkErrorMessageIsVisible();
});