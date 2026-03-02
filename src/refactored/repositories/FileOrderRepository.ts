import { IOrderRepository } from '../../interfaces/IOrderRepository';
import { Order } from '../Order';
import * as fs from 'fs/promises';

export class FileOrderRepository implements IOrderRepository {
  constructor(private folder = './') {}

  async save(order: Order): Promise<void> {
    const data = JSON.stringify(order);
    await fs.writeFile(`${this.folder}order_${order.id}.json`, data, 'utf8');
  }

  async findById(id: string): Promise<Order | null> {
    try {
      const raw = await fs.readFile(`${this.folder}order_${id}.json`, 'utf8');
      return JSON.parse(raw) as Order;
    } catch (e) {
      return null;
    }
  }
}
