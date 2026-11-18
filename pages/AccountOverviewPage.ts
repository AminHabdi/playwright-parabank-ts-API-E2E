import { Page, Locator } from '@playwright/test';
import registerData from '../resources/testData.json'

export class AccountOverview {
    readonly page: Page;
    readonly pageTitle: Locator;
    readonly accountsTable: Locator;
    readonly totalBalance: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pageTitle = page.getByRole('heading', { name: 'Accounts Overview' });
        this.accountsTable = page.locator('#accountTable');
        this.totalBalance = page.locator('#accountTable tr').filter({ hasText: 'Total' }).locator('td').last();

    }

    async waitForPageToLoad() {
        await this.pageTitle.waitFor({ state: 'visible'});
        await this.accountsTable.waitFor({ state: 'visible'});
        return this;
    }

};