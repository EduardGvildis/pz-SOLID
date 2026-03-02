import { IPaymentProcessor } from '../../interfaces/IPaymentProcessor';

export class PaypalProcessor implements IPaymentProcessor {
  async charge(amount: number): Promise<boolean> {
    // pretend to call external API
    return Promise.resolve(true);
  }
}
