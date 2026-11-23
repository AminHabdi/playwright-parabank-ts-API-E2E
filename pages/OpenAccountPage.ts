import { Page, Locator } from '@playwright/test';


export class OpenAccount {
    readonly page: Page;
    readonly openNewAccount: Locator;
    readonly accountTypSelect: Locator;
    readonly openNewAccountButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.openNewAccount = page.getByRole('link', { name: 'Open New Account' });
        this.accountTypSelect = page.locator('#type');
        this.openNewAccountButton = page.getByRole('button', { name: 'Open New Account' });
    };

    async selectAccountType(type: 'CHECKING' | 'SAVINGS') {
        await this.accountTypSelect.selectOption({ label: type });
    };

    async submitButton() {
        await this.openNewAccountButton.click();
    };
};