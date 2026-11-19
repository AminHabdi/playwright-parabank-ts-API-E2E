import { test, expect } from '@playwright/test';
import { RegisterPage } from '@pages/RegisterPage';
import registerDataJson from '@test-data/testData.json';
// import { TestDataStructure } from '../support/types/register.types'; // <- Kann weg, wird nicht benutzt

test.beforeEach(async ({ page, request }) => {
    await request.post('/parabank/services/bank/cleanDB');

    await page.goto('/parabank');
    const registerPage = new RegisterPage(page);
    await registerPage.clickRegisterLink();
    await expect(page).toHaveURL('/parabank/register.htm');
    await expect(registerPage.firstnameInput).toBeVisible();
})

test('Registration of a user', async ({ page }) => {
    const registerPage = new RegisterPage(page);

    const uniqueUseData = {
        ...registerDataJson.signingupValidData,
        username: `user${Date.now()}`
    };

    await registerPage.fillRegistrationForm(uniqueUseData);
    await registerPage.submitRegistration();    
    await expect(page.locator('#rightPanel')).toContainText('Your account was created');
});

test('Registration of an existing user', async ({ page }) => {
    const registerPage = new RegisterPage(page);

    const existingUser = {
        ...registerDataJson.signingupValidData,
        username: `user_${Date.now()}` // FIX 2 auch hier
    };

    // 1. Initial successful registration
    await registerPage.fillRegistrationForm(existingUser);
    await registerPage.submitRegistration();    
    await expect(page.locator('#rightPanel')).toContainText('Your account was created');

    await registerPage.clickLogoutLink();
    await expect(page.getByRole('button', { name: 'Log In' })).toBeVisible();    

    // 2. Explicitly navigate back to the registration page
    await page.goto('/parabank/register.htm');
    await expect(page).toHaveURL('/parabank/register.htm');
    await expect(registerPage.firstnameInput).toBeVisible();

    // 3. Attempt duplicate registration and verify error
    await registerPage.fillRegistrationForm(existingUser);
    await registerPage.submitRegistration(); 
    await expect(page.locator('.error')).toContainText('This username already exists.');
});
