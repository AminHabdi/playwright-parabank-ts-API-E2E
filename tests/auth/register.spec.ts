import { test, expect } from '@playwright/test';
import { ParaBankApi } from '@api/ParaBankApi';
import { createUniqueUser } from '@factories/userFactory';
import { RegisterPage } from '@pages/RegisterPage';
import registerDataJson from '@test-data/testData.json';

test.describe('ParaBank - Registration UI Tests', () => {
    let registerPage: RegisterPage;

    test.beforeEach(async ({ page, request }) => {

        await page.goto('/parabank');
        registerPage = new RegisterPage(page);
        await registerPage.clickRegisterLink();
    });

    test('TC04: Registration of a user', async ({ page }) => {
        const uniqueUserData = {
            ...registerDataJson.signingupValidData,
            username: `user${Date.now()}`,
        };

        await registerPage.fillRegistrationForm(uniqueUserData);
        await registerPage.submitRegistration();
        await expect(page.locator('#rightPanel')).toContainText('Your account was created');
    });

    test('TC05: Registration of an existing user', async ({ page, request }) => {
        const api = new ParaBankApi(request);
        const apiUser = createUniqueUser();
        await api.registerUser(apiUser);

        const uiExistingUser = {
            ...registerDataJson.signingupValidData,
            username: apiUser['customer.username'],
        };

        await registerPage.fillRegistrationForm(uiExistingUser);
        await registerPage.submitRegistration();

        await expect(page.locator('#rightPanel')).toContainText('This username already exists.');
    });

    test('TC11: Registration UI: password mismatch', async ({ page }) => {
        const mismatchUser = {
            ...registerDataJson.signingupValidData,
            username: `user${Date.now()}`,
            repeatedPassword: 'anderesPasswort123',
        };

        await registerPage.fillRegistrationForm(mismatchUser);
        await registerPage.submitRegistration();

        await expect(page.locator('#repeatedPassword\\.errors')).toHaveText('Passwords did not match.');
    });
});