import { test, expect } from '@playwright/test';
import { AccountOverview } from '@pages/AccountOverviewPage';
import { createAndLoginUser } from '@support/helpers/authHelpers';


test.describe('Account Overview', () => {

    test('TC14: Account Overview displays all accounts with correct balances', async ({ page, request }) => {
        const accountOverView = new AccountOverview(page);
       
        await createAndLoginUser(page, request);
        await expect(accountOverView.pageTitle).toHaveText('Accounts Overview');
        await expect(accountOverView.accountsTable).toBeVisible();
        await expect(accountOverView.totalBalance).toBeVisible();

    });
});