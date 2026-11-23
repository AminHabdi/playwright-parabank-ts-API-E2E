import { Page, Locator } from '@playwright/test';


export class AccountOverview {
    readonly page: Page;
    readonly pageTitle: Locator;
    readonly accountsTable: Locator;
    readonly totalBalance: Locator;
    readonly pageTitleLink: Locator;
    readonly openNewAccount: Locator;
    readonly accountTypSelect: Locator;
    readonly openNewAccountButton: Locator;



    constructor(page: Page) {
        this.page = page;
        this.pageTitle = page.getByRole('heading', { name: 'Accounts Overview' });
        this.accountsTable = page.locator('#accountTable');
        this.totalBalance = page.locator('#accountTable tr').filter({ hasText: 'Total' }).locator('td').last();
        this.pageTitleLink = page.getByRole('link', { name: 'Accounts Overviw' });
        this.openNewAccount = page.getByRole('link', { name: 'Open New Account' });
        this.accountTypSelect = page.locator('#type');
        this.openNewAccountButton = page.getByRole('button', {name: 'Open New Account'});
    };

     async selectAccountType(type: 'CHECKING' | 'SAVINGS') {
        await this.accountTypSelect.selectOption({ label: type });
    };

    async submitButton() {
        await this.openNewAccountButton.click();
    };
};