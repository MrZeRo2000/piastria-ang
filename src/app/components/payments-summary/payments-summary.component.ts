import {Component, computed, inject, input} from '@angular/core';
import {PaymentGroupAmountSummary} from '../../model/payment-group-amount-summary';
import {Payment} from '../../model/payment';
import {PaymentGroup} from '../../model/payment-group';
import {AmountPipe} from "../../core/pipes/amount.pipe";
import {MatCardModule} from "@angular/material/card";
import {MatTableModule} from "@angular/material/table";
import {PAYMENT_REFS_READ_REPOSITORY} from "../../repository/repository-tokens";
import {PaymentsTableDisplayOptions} from "../payments-table-display-options/payments-table-display-options.component";

@Component({
  selector: 'app-payments-summary',
  templateUrl: './payments-summary.component.html',
  imports: [
    AmountPipe,
    MatCardModule,
    MatTableModule
  ],
  styleUrls: ['./payments-summary.component.scss']
})
export class PaymentsSummaryComponent {
  private readRepository = inject(PAYMENT_REFS_READ_REPOSITORY)

  selectedItems = input<Array<Payment>>([]);
  paymentsTableDisplayOptions = input.required<PaymentsTableDisplayOptions>();

  displayedColumns = ['group', 'amount'];

  private summary = computed(() => {
    const payments = this.readRepository.dataSignal()[0]?.paymentList ?? [];
    const selected = this.selectedItems();

    const total = new PaymentGroupAmountSummary(new PaymentGroup(-1, 'Total'), 0, 0);
    const selectedSummary = new PaymentGroupAmountSummary(new PaymentGroup(-2, 'Selected'), 0, 0);
    const groups: Array<PaymentGroupAmountSummary> = [];

    payments.forEach(payment => {
      const paymentAmount = payment.paymentAmount ?? 0;
      const commissionAmount = payment.commissionAmount ?? 0;
      const paymentGroup = payment.paymentGroup;
      if (paymentGroup) {
        const group = groups.find(value => value.paymentGroup.id === paymentGroup.id);
        if (group === undefined) {
          groups.push(new PaymentGroupAmountSummary(paymentGroup, paymentAmount, commissionAmount));
        } else {
          group.addAmounts(paymentAmount, commissionAmount);
        }
      }

      total.addAmounts(paymentAmount, commissionAmount);

      if (selected.indexOf(payment) > -1) {
        selectedSummary.addAmounts(paymentAmount, commissionAmount);
      }
    });

    return {total, selectedSummary, groups};
  });

  totalSummary = computed(() => this.summary().total);
  selectedSummary = computed(() => this.summary().selectedSummary);
  groupSummary = computed(() => this.summary().groups);
  hasSelection = computed(() => this.selectedItems().length > 0);
}
