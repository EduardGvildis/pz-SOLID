import { IPaymentProcessor } from '../interfaces/IPaymentProcessor';
import { IOrderRepository } from '../interfaces/IOrderRepository';
import { INotifier } from '../interfaces/INotifier';
import { Order } from './Order';

export class OrderService {
  constructor(
    private paymentProcessor: IPaymentProcessor,
    private repository: IOrderRepository,
    private notifier: INotifier
  ) {}

  async process(order: Order): Promise<{ success: true }>
  {
    if (!order.email || order.amount <= 0) throw new Error('Invalid order');

    const paid = await this.paymentProcessor.charge(order.amount);
    if (!paid) throw new Error('Payment failed');

    await this.repository.save(order);

    await this.notifier.send(order.email, 'Your order was processed');

    return { success: true };
  }
}
