import { test, expect } from '@playwright/test';
import { ParaBankApi } from '@api/ParaBankApi';
import { LoginPage } from '@pages/LoginPage';
import { createUniqueUser } from '@factories/userFactory';

test.describe('ParaBank - Auth Integration Test', () => {

    test.beforeEach(async ({ request }) => {
        const api = new ParaBankApi(request);
        api.cleanDB();
    })

    test('TC03 - User Login UI after API-Registration', async ( { request, page}) => {
        const api = new ParaBankApi(request);
        const loginpage = new LoginPage(page);
        const user = createUniqueUser();

        await api.registerUser(user);

        await loginpage.goto();
        await loginpage.login(user['customer.username'], user['customer.password']);

        await expect(page).toHaveURL('/parabank/overview.htm');
        await expect(page.getByRole('heading', { name: 'Accounts Overview' })).toBeVisible();

    });
});