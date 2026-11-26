import { Page, Locator } from '@playwright/test';
import { BillPayData } from '@support/types/billpay.types';

export class BillPay {
    readonly page: Page;

    readonly payeeNameInput: Locator;
    readonly payeeStreetInput: Locator;
    readonly payeeCityInput: Locator;
    readonly payeeStateInput: Locator;
    readonly payeeZipInput: Locator;
    readonly payeePhoneInput: Locator;
    readonly accountNumberInput: Locator;
    readonly verifyAccountInput: Locator;
    readonly amountInput: Locator;
    readonly fromAccountSelect: Locator;
    readonly sendPaymentButton: Locator;
    readonly successHeading: Locator;
    readonly errorMessage: Locator;
    readonly mismatchError: Locator;


    constructor(page: Page) {
        this.page = page;

        this.payeeNameInput = page.locator('input[name="payee.name"]');
        this.payeeStreetInput = page.locator('input[name="payee.address.street"]');
        this.payeeCityInput = page.locator('input[name="payee.address.city"]');
        this.payeeStateInput = page.locator('input[name="payee.address.state"]');
        this.payeeZipInput = page.locator('input[name="payee.address.zipCode"]');
        this.payeePhoneInput = page.locator('input[name="payee.phoneNumber"]');
        this.accountNumberInput = page.locator('input[name="payee.accountNumber"]');
        this.verifyAccountInput = page.locator('input[name="verifyAccount"]');
        this.amountInput = page.locator('input[name="amount"]');
        this.fromAccountSelect = page.locator('select[name="fromAccountId"]');
        this.sendPaymentButton = page.getByRole('button', { name: 'Send Payment' });
        this.successHeading = page.getByRole('heading', { name: 'Bill Payment Complete' });
        this.errorMessage = page.locator('.error');
        this.mismatchError = this.page
            .locator('.error')
            .filter({ hasText: /do not match/i });
    }

    async goto() {
        await this.page.goto('/parabank/billpay.htm');
    }

    async fillPayee(data: BillPayData) {
        await this.payeeNameInput.fill(data.payeeName);
        await this.payeeStreetInput.fill(data.address);
        await this.payeeCityInput.fill(data.city);
        await this.payeeStateInput.fill(data.state);
        await this.payeeZipInput.fill(data.zip);
        await this.payeePhoneInput.fill(data.phone);
        await this.accountNumberInput.fill(data.account);
        await this.verifyAccountInput.fill(data.account);
        await this.amountInput.fill(data.amount);
    }

    async pay(data: BillPayData) {
        await this.fillPayee(data);
        await this.sendPaymentButton.click();
    }
}