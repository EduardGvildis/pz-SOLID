// Anti-SOLID example: one class does everything
export type Order = {
  id: string;
  amount: number;
  email: string;
};

class Paypal {
  // concrete payment implementation
  charge(amount: number) {
    console.log(`Charging ${amount} via Paypal`);
    return true;
  }
}

export class OrderProcessor {
  // responsibility: validate, charge, persist, notify — too many responsibilities
  process(order: Order) {
    // validation
    if (!order.email || order.amount <= 0) {
      throw new Error('Invalid order');
    }

    // payment
    const paypal = new Paypal();
    const paid = paypal.charge(order.amount);
    if (!paid) throw new Error('Payment failed');

    // persistence (synchronous file write in real app — here simplified)
    const fs = require('fs');
    const data = JSON.stringify(order);
    fs.writeFileSync('./order_' + order.id + '.json', data);

    // notification
    console.log(`Sending email to ${order.email}`);

    return { success: true };
  }
}

// This class couples to concrete implementations and mixes concerns.
