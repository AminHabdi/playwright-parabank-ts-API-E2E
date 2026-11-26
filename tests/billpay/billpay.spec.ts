import { test, expect } from '@playwright/test';
import { createAndLoginUser } from '@support/helpers/authHelpers';
import { BillPayDataFile } from '@support/types/billpay.types';
import billPayDataJson from '@test-data/billPayment.json';
import { BillPay } from '@pages/billPayment';
const BillPayData = billPayDataJson as BillPayDataFile;


test.beforeEach(async ({ page, request }) => {
    await createAndLoginUser(page, request);

});

test.describe('Bill Payment', () => {

    test('TC19: Pay a bill successfully', async ({ page }) => {

        const billPay = new BillPay(page);
        await billPay.goto();

        await expect(page).toHaveURL('/parabank/billpay.htm');
        await expect(billPay.sendPaymentButton).toBeVisible();

        await billPay.pay(BillPayData.validBill)
        await expect(billPay.successHeading).toHaveText('Bill Payment Complete');
    });

    test('TC20: Bill Pay rejects mismatched account numbers', async ({ page }) => {
        const billPay = new BillPay(page);

        await billPay.goto();
        await billPay.fillPayee(BillPayData.validBill);
        await billPay.accountNumberInput.fill('12314142');
        await billPay.verifyAccountInput.fill('555555');
        await billPay.sendPaymentButton.click();
        await expect(billPay.mismatchError).toContainText('The account numbers do not match.');
        await expect(billPay.successHeading).not.toBeVisible();

    });

});