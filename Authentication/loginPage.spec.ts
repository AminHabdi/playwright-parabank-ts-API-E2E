import { test, expect } from '@playwright/test';
import { RegisterPage } from '../pages/RegisterPage';
import { LoginPage } from '../pages/LoginPage';
import registerDataJson from '../resources/testData.json';

test.describe.configure({ mode: 'serial' });

let currentUser: any;

test.beforeEach(async ({ page }) => {
    await page.goto('/parabank');

    const registerPage = new RegisterPage(page);
    await registerPage.clickRegisterLink();

    currentUser = {
        ...registerDataJson.signingupValidData,
        username: `user_${Math.floor(Math.random() * 10000000)}`
    };
    
    await registerPage.fillRegistrationForm(currentUser);
    await registerPage.submitRegistration();

    const loginPage = new LoginPage(page);
    await loginPage.logout();
});

test('Successful User Login', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // FIX: Nutze currentUser statt der statischen JSON-Daten!
    await loginPage.login(currentUser.username, currentUser.password);
    await expect(page).toHaveTitle('ParaBank | Accounts Overview');
});

test('Successful User Logout', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login(currentUser.username, currentUser.password);
    await expect(page).toHaveTitle('ParaBank | Accounts Overview');
    
    await loginPage.logout();
    await expect(page).toHaveTitle('ParaBank | Welcome | Online Banking');
});