export class ScanResult {
  constructor(public productName: string, public scanValue: number, public disabled?: boolean) { }
}

export interface PaymentImport {
  paymentId: number;
  paymentAmount: number;
}
