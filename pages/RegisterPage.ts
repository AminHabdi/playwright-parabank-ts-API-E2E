import { Page, Locator } from '@playwright/test';
import type { UserData } from '@support/types'

export class RegisterPage {
    readonly page: Page;
    readonly registerLink: Locator;
    readonly firstnameInput: Locator;
    readonly lastnameInput: Locator;
    readonly addressInput: Locator;
    readonly cityInput: Locator;
    readonly stateInput: Locator;
    readonly zipCodeInput: Locator;
    readonly phoneInput: Locator;
    readonly ssnInput: Locator;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly confirmInput: Locator;
    readonly registerButton: Locator;
    readonly logOutLink: Locator;



    constructor(page: Page) {
        this.page = page;
        this.registerLink = this.page.getByRole('link', { name: 'Register' });
        this.firstnameInput = this.page.locator('#customer\\.firstName');
        this.lastnameInput = this.page.locator('#customer\\.lastName');
        this.addressInput = this.page.locator('#customer\\.address\\.street');
        this.cityInput = this.page.locator('#customer\\.address\\.city');
        this.stateInput = this.page.locator('#customer\\.address\\.state');
        this.zipCodeInput = this.page.locator('#customer\\.address\\.zipCode');
        this.phoneInput = this.page.locator('#customer\\.phoneNumber');
        this.ssnInput = this.page.locator('#customer\\.ssn');
        this.usernameInput = this.page.locator('#customer\\.username');
        this.passwordInput = this.page.locator('#customer\\.password');
        this.confirmInput = this.page.locator('#repeatedPassword');
        this.registerButton = this.page.getByRole('button', { name: 'Register' });
        this.logOutLink = this.page.getByRole('link', { name: 'Log Out' });

    }

    async clickRegisterLink() {
        await this.registerLink.click();
    }

    async clickLogoutLink() {
        await this.logOutLink.click();
    }


    async fillRegistrationForm(userData: UserData) {
            await this.firstnameInput.fill(userData.firstName);
            await this.lastnameInput.fill(userData.lastName);
            await this.addressInput.fill(userData.address);
            await this.cityInput.fill(userData.city);
            await this.stateInput.fill(userData.state);
            await this.zipCodeInput.fill(userData.zipCode);
            await this.phoneInput.fill(userData.phone);
            await this.ssnInput.fill(userData.ssn);
            //await this.usernameInput.fill(userData.);
            await this.passwordInput.fill(userData.password);
            await this.confirmInput.fill(userData.password);
        }
    
    async submitRegistration() {
            await this.registerButton.click();
        }
    }
