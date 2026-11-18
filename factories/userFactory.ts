import rawTestDataJson from '@test-data/testData.json';
import rawTestData from '@test-data/testData.json';
import { randomUUID } from 'node:crypto';
import { TestDataStructure, RegistrationPayload } from '@support/types';

const testData = rawTestData as TestDataStructure;

export function createUniqueUser(): RegistrationPayload {
  const d = testData.signingupValidData;
  const suffix = Math.random().toString(36).substring(2, 10);

  return {
    'customer.firstName': d.firstName,
    'customer.lastName': d.lastName,
    'customer.address.street': d.address,
    'customer.address.city': d.city,
    'customer.address.state': d.state,
    'customer.address.zipCode': d.zipCode,
    'customer.phoneNumber': d.phone,
    'customer.ssn': d.ssn,
    'customer.username': `${suffix}`,
    'customer.password': 'SecurePassword123!',
    'repeatedPassword': 'SecurePassword123!',

  };
}
