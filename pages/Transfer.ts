import { Page, Locator } from '@playwright/test';

export class Transfer {
    readonly page: Page;
    readonly amountInput: Locator;
    readonly transferButton: Locator;
    readonly pageTitle: Locator;
      readonly emptyAmountError: Locator; 

    constructor(page: Page) {

        this.page = page;
        this.amountInput = page.locator('#amount');
        this.transferButton = page.getByRole('button', { name: 'Transfer' });
        this.pageTitle = page.getByRole('heading', {name: 'Transfer Complete!'});
        this.emptyAmountError = page.getByText('An internal error has occurred and has been logged.');
    };

    async goto() {
        await this.page.goto('/parabank/transfer.htm');
    }
    async transfer(amount: string ) {
       await this.amountInput.fill(amount);
    };

    async transferCompelete() {
        await this.transferButton.click();
    };


};