import { expect, test } from '@playwright/test'
import { LoginPage } from '../Page_Object/LoginPage'
import { RegisterPage } from '../Page_Object/RegisterPage';
import registerDataJson from '../resources/testData.json'
import { AccountOverview } from '../Page_Object/AccountOverview'

test.beforeEach(async ({ page }) => {    
    await page.goto('/parabank');
  
    const registerPage = new RegisterPage(page);
    await registerPage.clickRegisterLink();

    const currentUser = {
        ...registerDataJson.signingupValidData,
        username: `user_${Math.floor(Math.random() * 10000000)}`
    };
    
    await registerPage.fillRegistrationForm(currentUser);
    await registerPage.submitRegistration();
    await page.getByRole('link', { name: 'Accounts Overview' }).click();
});

test('View Accounts Overview', async({ page }) => {
    const viewAccountsOverview = new AccountOverview(page);
    await viewAccountsOverview.waitForPageToLoad();

    await expect(viewAccountsOverview.pageTitle).toBeVisible();
    await expect(viewAccountsOverview.accountsTable).toBeVisible();
    await expect(viewAccountsOverview.totalBalance).toBeVisible();
});