export type Order = {
  id: string;
  amount: number;
  email: string;
};

export class OrderEntity {
  constructor(public data: Order) {}
}
