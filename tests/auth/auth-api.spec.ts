import { test, expect } from '@playwright/test';
import { ParaBankApi } from '@api/ParaBankApi';
import { createUniqueUser } from '@factories/userFactory';
//import { request } from 'node:http';

test.describe('ParaBank - Authentication API Tests', () => {

    test.beforeEach(async ({ request }) => {
        const api = new ParaBankApi(request);
        await api.cleanDB();
    });

    test('TC01: User Registration via API', async ({ request }) => {
        const parabankApi = new ParaBankApi(request);
        const payload = createUniqueUser();

        const response = await parabankApi.registerUser(payload);
        const responseBody = await response.text();

        expect(response.status()).toBe(200);
        expect(responseBody).not.toContain('This username already exists');
        expect(responseBody).toContain('Your account was created successfully.');
    });

    test('TC02: User Login via API', async ({ request }) => {
        const api = new ParaBankApi(request);
        const user = createUniqueUser();
        const response = await api.registerUser(user);

        expect(response.status()).toBe(200);

        const loginRes = api.login(user['customer.username'], user['customer.password']);
        const loginBody = (await loginRes).text();

        expect((await loginRes).status()).toBe(200);
        expect(await loginBody).toContain('Accounts Overview');
    })
});