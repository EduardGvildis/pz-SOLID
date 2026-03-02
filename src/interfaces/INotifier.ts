export interface INotifier {
  send(email: string, message: string): Promise<void>;
}
