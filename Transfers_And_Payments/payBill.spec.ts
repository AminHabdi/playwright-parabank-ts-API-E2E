import { expect, test } from '@playwright/test';
import { LoginPage } from '../Page_Object/LoginPage'
import { RegisterPage } from '../Page_Object/RegisterPage';
import registerDataJson from '../resources/testData.json'
import { register } from 'module';

test ('Bill Payment Complete', async ( { page }) => {
    await page.goto('/parabank');

    const registerPage = new RegisterPage(page)
    registerPage.clickRegisterLink();
    await expect(page).toHaveURL('/parabank/register.htm');

    registerPage.fillRegistrationForm(registerDataJson.signingupValidData.username,
                                    
    )

    

});
