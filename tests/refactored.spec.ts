import { Order } from '../src/refactored/Order';
import { OrderService } from '../src/refactored/OrderService';
import { IPaymentProcessor } from '../src/interfaces/IPaymentProcessor';
import { IOrderRepository } from '../src/interfaces/IOrderRepository';
import { INotifier } from '../src/interfaces/INotifier';

class FakePayment implements IPaymentProcessor {
  async charge(amount: number) { return true; }
}

class InMemRepo implements IOrderRepository {
  private store = new Map<string, Order>();
  async save(order: Order) { this.store.set(order.id, order); }
  async findById(id: string) { return this.store.get(id) ?? null; }
}

class FakeNotifier implements INotifier {
  async send(email: string, message: string) { /* noop */ }
}

describe('OrderService', () => {
  it('processes a valid order', async () => {
    const order: Order = { id: '1', amount: 10, email: 'a@b.com' };
    const svc = new OrderService(new FakePayment(), new InMemRepo(), new FakeNotifier());
    const res = await svc.process(order);
    expect(res).toEqual({ success: true });
  });
});
