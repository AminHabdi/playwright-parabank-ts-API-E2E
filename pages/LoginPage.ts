import { Page, Locator } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly loginButton: Locator;
    readonly logoutButton: Locator;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;    

    constructor(page: Page) {
        this.page = page;
        this.loginButton = page.getByRole('button', {name: 'Log In'});
        this.logoutButton = page.getByRole('link', {name: 'Log Out'});
        this.usernameInput = page.locator('#loginPanel input[name="username"]');
        this.passwordInput = page.locator('#loginPanel input[name="password"]');
    }

    async goto() {
        await this.page.goto('/parabank/index.htm');
    }

    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async logout() {
        await this.logoutButton.click();
    }
};

