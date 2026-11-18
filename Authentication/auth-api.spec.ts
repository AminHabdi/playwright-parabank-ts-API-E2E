import { test, expect } from '@playwright/test';
import rawTestData from '../resources/testData.json';
import { TestDataStructure } from '../support/types';

const testData: TestDataStructure = rawTestData;

test.describe.serial('ParaBank - Authentication API Tests', () => {
    test('TC01: Successful User Registration via API', async ({ request }) => {
        const uniqueUsername = `api_user_${Date.now()}`;
        const data = testData.signingupValidData;

        await request.get('/parabank/register.htm');

        //const uniqueSsn = `${Math.floor(100 + Math.random() * 900)}-${Math.floor(10 + Math.random() * 90)}-${Math.floor(1000 + Math.random() * 9000)}`;

        const response = await request.post('/parabank/register.htm', {
            form: {
                'customer.firstName': data.firstName,
                'customer.lastName': data.lastName,
                'customer.address.street': data.address,
                'customer.address.city': data.city,
                'customer.address.state': data.state,
                'customer.address.zipCode': data.zipCode,
                'customer.phoneNumber': data.phone,
                'customer.ssn': data.ssn,
                'customer.username': uniqueUsername,
                'customer.password': data.password,
                'repeatedPassword': data.password,
            }
        });

        expect(response.status()).toBe(200);
    });
});