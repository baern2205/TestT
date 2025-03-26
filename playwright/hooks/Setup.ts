import {test as setup} from '@playwright/test';
import {LoginPage} from "../page_object/LoginPage";
import userData from "playwright/config/userData.json";

setup('Setup the test', async ({page, context}) => {
    console.log('Opening browser');
    await page.goto(userData.baseUrl);

    const loginPage = await new LoginPage(page);
    await loginPage.waitLoginPageToLoad();
    await loginPage.login(userData.username,userData.password);
    await context.storageState({ path: './playwright/artifacts/authState.json' });
});