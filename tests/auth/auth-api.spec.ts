import { test, expect } from '@playwright/test';
import { ParaBankApi } from '@api/ParaBankApi';
import { createUniqueUser } from '@factories/userFactory';
import { RegistrationPayload } from '@support/types/index'

test.describe('ParaBank - Authentication API Tests', () => {


    test('TC01: User Registration via API', async ({ request }) => {
        const api = new ParaBankApi(request);
        const payload = createUniqueUser();

        const response = await api.registerUser(payload);
        const responseBody = await response.text();

        expect(response.status()).toBe(200);
        expect(responseBody).not.toContain('This username already exists');
        expect(responseBody).toContain('Your account was created successfully.');
    });

    test('TC02: User Login via API', async ({ request }) => {
        const api = new ParaBankApi(request);
        const user = createUniqueUser();

        const registerRes = await api.registerUser(user);
        expect(registerRes.status()).toBe(200);

        const loginRes = await api.login(user['customer.username'], user['customer.password']);
        expect(loginRes.status()).toBe(200);

        const loginBody = await loginRes.text();
        expect(loginBody).not.toContain('The username and password could not be verified.');
        expect(loginBody).toContain('Accounts Overview');
    });

    test('TC09: Duplicate username', async ({ request }) => {
        const api = new ParaBankApi(request);
        const user = createUniqueUser();

        const firstResponse = await api.registerUser(user);
        expect(firstResponse.status()).toBe(200);

        const duplicateResponse = await api.registerUser(user);
        expect(duplicateResponse.status()).toBe(200);

        const duplicateBody = await duplicateResponse.text();
        expect(duplicateBody).toContain('This username already exists');
    });

    test.fixme('TC10: missing required fields', async ({ request }) => {
        const api = new ParaBankApi(request);
        const user = createUniqueUser();
        const { ['customer.address.city']: _removed, ...incompleteUser } = user;

        const response = await api.registerUser(incompleteUser as RegistrationPayload);
        expect(response.status()).toBe(400);


    });
});