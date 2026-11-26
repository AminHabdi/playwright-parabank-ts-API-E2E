import { test, expect } from '@playwright/test';
import { ParaBankApi } from '@api/ParaBankApi';
import { createUniqueUser } from '@factories/userFactory';
import { LoginPage } from '@pages/LoginPage';
import { Transfer } from '@pages/Transfer';


test.beforeEach(async ({ page, request }) => {
    const api = new ParaBankApi(request);
    const payload = createUniqueUser();
    const loginpage = new LoginPage(page);


    const response = await api.registerUser(payload);
    expect(response.status()).toBe(200);

    await loginpage.goto();
    await loginpage.login(payload['customer.username'], payload['customer.password']);
});

test.describe('Transfer', () => {

    test('TC17: Transfer funds between own accounts', async ({ page }) => {

        const transfer = new Transfer(page);
        const pagetitle = transfer.pageTitle;
        
        await transfer.goto();
        await transfer.transfer('1');
        await transfer.transferCompelete();
        await expect(page).toHaveURL('/parabank/transfer.htm');
        await expect(pagetitle).toHaveText('Transfer Complete!');

    });

    test('TC18: Transfer with empty ammount', async ({ page }) => {

        const transfer = new Transfer(page);
        const errorDisplay = transfer.emptyAmountError;

        await transfer.goto();
        await transfer.transferCompelete();
        await expect(page).toHaveURL('/parabank/transfer.htm');
        await expect(errorDisplay).toBeVisible();


    });
})