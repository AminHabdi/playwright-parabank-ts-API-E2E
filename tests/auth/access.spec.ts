import { test, expect } from '@playwright/test';
import { ParaBankApi } from '@api/ParaBankApi';
import { LoginPage } from '@pages/LoginPage';
import { createUniqueUser } from '@factories/userFactory';
import { ENDPOINTS } from '@support/constants/endpoints';

test.describe('ParaBank - Access Control', () => {

    test('TC12: Access protected page without login', async ({ page }) => {
        await page.goto(ENDPOINTS.PROTECTED_URL);
        await expect(page.locator('#rightPanel')).toContainText('An internal error has occurred and has been logged.');
        await expect(page.getByRole('heading', { name: 'Account Overview' })).not.toBeVisible();

    });

    test('TC13: Access after Logout', async ({ page, request }) => {
        const user = createUniqueUser();
        const api = new ParaBankApi(request);
        await api.registerUser(user);
        const loginUser = new LoginPage(page);

        await loginUser.goto();
        await loginUser.login(user['customer.username'], user['customer.password']);
        await expect(page).toHaveURL('/parabank/overview.htm');

        await loginUser.logout();
        await expect(page).toHaveTitle('ParaBank | Welcome | Online Banking');

    })

});