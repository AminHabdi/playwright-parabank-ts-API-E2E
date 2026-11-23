import { test, expect } from '@playwright/test';
import { ParaBankApi } from '@api/ParaBankApi';
import { createUniqueUser } from '@factories/userFactory';
import { LoginPage } from '@pages/LoginPage';
import { AccountOverview } from '@pages/AccountOverviewPage';



test.describe('Account Overview', () => {
    test('TC14: Account Overview displays all accounts with correct balances', async( {page, request} ) => {

    const api = new ParaBankApi(request);
    const payload =  createUniqueUser();
    const loginpage = new LoginPage(page);
    const accountOverView = new AccountOverview(page);

    const response = await api.registerUser(payload);
    expect(response.status()).toBe(200);
   
    await loginpage.goto();
    await loginpage.login(payload['customer.username'], payload['customer.password']);
    await expect(accountOverView.pageTitle).toHaveText('Accounts Overview');
    await expect(accountOverView.accountsTable).toBeVisible();
    await expect(accountOverView.totalBalance).toBeVisible();   

    });
});