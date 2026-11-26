export interface BillPayData {
  payeeName: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  account: string;
  amount: string;
}

export interface BillPayDataFile {
  validBill: BillPayData;
}