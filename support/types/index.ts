export interface UserData {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  ssn: string;
  username: string;
  password: string;
  repeatedPassword: string;


}

export interface TestDataStructure {
  signingupValidData: UserData
}

export type RegistrationPayload = {
  'customer.firstName': string;
  'customer.lastName': string;
  'customer.address.street': string;
  'customer.address.city': string;
  'customer.address.state': string;
  'customer.address.zipCode': string;
  'customer.phoneNumber': string;
  'customer.ssn': string;
  'customer.username': string;
  'customer.password': string;
  'customer.repeatedPassword': string;
}