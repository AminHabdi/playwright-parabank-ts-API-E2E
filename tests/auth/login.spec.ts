import { test, expect } from '@playwright/test';
import { ParaBankApi } from '@api/ParaBankApi';
import { LoginPage } from '@pages/LoginPage';
import { createUniqueUser } from '@factories/userFactory';

test.describe('ParaBank - Login UI Tests', () => {
    let api: ParaBankApi;
    let loginPage: LoginPage;

    test.beforeEach(async ({ page, request }) => {
        api = new ParaBankApi(request);
        loginPage = new LoginPage(page);
    });

    test('TC03: User Login UI after API-Registration', async ({ page }) => {
        const user = createUniqueUser();
        const response = await api.registerUser(user);

        expect(response.status()).toBe(200);
        expect(response.url()).toContain('/parabank/register.htm');

        await loginPage.goto();
        await loginPage.login(user['customer.username'], user['customer.password']);
        await expect(page).toHaveURL(/\/parabank\/overview\.htm/);
    });

    test('TC06: Login UI Wrong Password', async ({ page }) => {
        const user = createUniqueUser();
        const response = await api.registerUser(user);
        expect(response.status()).toBe(200);

        await loginPage.goto();
        await loginPage.login(user['customer.username'], `${user['customer.password']}_wrong`);

        await expect(page.locator('.error')).toBeVisible();
        await expect(page.getByText('The username and password could not be verified')).toBeVisible();
    });

    test('TC07: Login UI Non-Existent User', async ({ page }) => {
        await loginPage.goto();
        await loginPage.login('NonExistingUser', 'WrongPassword123');

        await expect(page.locator('.error')).toBeVisible();
        await expect(page.getByText('The username and password could not be verified')).toBeVisible();
    });

    test('TC08: Login UI Empty User', async ({ page }) => {
        await loginPage.goto();
        await loginPage.login('', '');

        await expect(page.locator('.error')).toBeVisible();
        await expect(page.getByText('Please enter a username and password.')).toBeVisible();
    });
});