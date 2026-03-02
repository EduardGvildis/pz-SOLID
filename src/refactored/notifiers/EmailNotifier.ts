import { INotifier } from '../../interfaces/INotifier';

export class EmailNotifier implements INotifier {
  async send(email: string, message: string): Promise<void> {
    // simulate email send
    return Promise.resolve();
  }
}
