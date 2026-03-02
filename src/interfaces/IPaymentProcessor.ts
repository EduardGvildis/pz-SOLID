export interface IPaymentProcessor {
  charge(amount: number): Promise<boolean>;
}
