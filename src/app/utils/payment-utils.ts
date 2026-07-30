import {Payment} from '../model/payment';
import {PaymentAmountSummary} from '../model/payment-amount-summary';

export class PaymentUtils {

  static calcPaymentAmountSummary(payments: Array<Payment>): PaymentAmountSummary {
    return payments.reduce(
      (a, v) => a.addAmounts(v.paymentAmount ?? 0, v.commissionAmount ?? 0), new PaymentAmountSummary(0, 0)
    );
  }

  static groupBy(payments: Array<Payment>, groupFields: Array<string>): Array<Payment> {
    const groupedItems: Record<string, [number, number]> = payments.reduce(
      (ap, vp) => {
        const groupObject: Record<string, unknown> = Object.keys(vp)
          .filter(v => groupFields.includes(v))
          .reduce((a: Record<string, unknown>, v) => {a[v] = (vp as unknown as Record<string, unknown>)[v]; return a;},
            {});

        const groupKey = JSON.stringify(groupObject);
        const paymentAmount = vp.paymentAmount ?? 0;
        const commissionAmount = vp.commissionAmount ?? 0;
        if (ap[groupKey]) {
          ap[groupKey] = [paymentAmount + ap[groupKey][0], commissionAmount + ap[groupKey][1]];
        } else {
          ap[groupKey] = [paymentAmount, commissionAmount];
        }

        return ap;
      },
      {} as Record<string, [number, number]>
    );

    return Object.keys(groupedItems).reduce((a: Array<Payment>, v) => {
      const payment: Payment = JSON.parse(v);
      if (payment.periodDate) {
        payment.date = new Date(payment.periodDate);
      }
      if (payment.periodDate) {
        payment.periodDate = new Date(payment.periodDate);
      }
      payment.paymentAmount = groupedItems[v][0];
      payment.commissionAmount = groupedItems[v][1];
      a.push(payment);
      return a;
    },[]);
  }
}
