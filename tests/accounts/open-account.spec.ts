import { test, expect } from '@playwright/test';
import { ParaBankApi } from '@api/ParaBankApi';
import { createUniqueUser } from '@factories/userFactory';
import { LoginPage } from '@pages/LoginPage';
import { OpenAccount } from '@pages/OpenAccountPage';

test.beforeEach(async ({ page, request }) => {
    const api = new ParaBankApi(request);
    const payload = createUniqueUser();
    const loginpage = new LoginPage(page);


    const response = await api.registerUser(payload);
    expect(response.status()).toBe(200);

    await loginpage.goto();
    await loginpage.login(payload['customer.username'], payload['customer.password']);
});


test.describe('Open Account', () => {

    test('TC15: Open a new Savings account', async ({ page }) => {
        const openaccount = new OpenAccount(page);

        await openaccount.openNewAccount.click();
        await expect(page).toHaveURL('/parabank/openaccount.htm');
        await openaccount.selectAccountType('SAVINGS');
        await openaccount.submitButton();
        await expect(page.getByRole('heading', { name: 'Account Opened!' })).toBeVisible();
    });

     test('TC16: Open a new Checking account', async ({ page }) => {
        const openaccount = new OpenAccount(page);

        await openaccount.openNewAccount.click();
        await expect(page).toHaveURL('/parabank/openaccount.htm');
        await openaccount.selectAccountType('CHECKING');
        await openaccount.submitButton();
        await expect(page.getByRole('heading', { name: 'Account Opened!' })).toBeVisible();
    });
});