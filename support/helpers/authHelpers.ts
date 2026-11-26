import { expect, Page, APIRequestContext } from '@playwright/test';
import { ParaBankApi } from '@api/ParaBankApi';
import { createUniqueUser } from '@factories/userFactory';
import { LoginPage } from '@pages/LoginPage';

export async function createAndLoginUser(page: Page, request: APIRequestContext) {
    const api = new ParaBankApi(request);
    const payload = createUniqueUser();
    const loginPage = new LoginPage(page);

    const response = await api.registerUser(payload);
    expect(response.ok()).toBeTruthy();
    expect(await response.text()).toContain('Your account was created successfully');

    await loginPage.goto();
    await loginPage.login(payload['customer.username'], payload['customer.password']);

    return payload;
}