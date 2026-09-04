import {Component, computed, inject, OnInit} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {SCAN_LATEST_READ_REPOSITORY} from "../../repository/repository-tokens";
import {LoadingProgressComponent} from "../../core/components/loading-progress/loading-progress.component";
import {PaymentObject} from "../../model/payment-object";
import {HttpParams} from "@angular/common/http";
import {MatListOption, MatSelectionList} from "@angular/material/list";
import {DecimalPipe} from "@angular/common";
import {toSignal} from "@angular/core/rxjs-interop";
import {map, of, switchMap, tap} from "rxjs";
import {ScanResult} from "../../model/scan";
import {Payment} from "../../model/payment";

@Component({
  selector: 'app-payments-import-dialog',
  imports: [
    MatDialogTitle,
    MatDialogActions,
    MatDialogContent,
    MatButton,
    MatDialogClose,
    LoadingProgressComponent,
    MatSelectionList,
    MatListOption,
    DecimalPipe
  ],
  templateUrl: './payments-import-dialog.component.html',
  styleUrl: './payments-import-dialog.component.scss',
})
export class PaymentsImportDialogComponent implements OnInit {
  readonly readRepository = inject(SCAN_LATEST_READ_REPOSITORY)
  readonly data = inject<{paymentObject: PaymentObject, payments: Payment[]}>(MAT_DIALOG_DATA);
  readonly productNames = this.data.payments.map(p => p.product!.name);
  dataSignal = toSignal(this.readRepository.loadDataAction$.pipe(
    map(scan =>
      Object.fromEntries(
        scan.map(v => [v.productName, new ScanResult(v.productName, v.scanValue, this.productNames.indexOf(v.productName) == -1)])
      ) as {[index: string]: ScanResult}
    ),
    switchMap(scan => {
      const found = this.data.payments.map(
        v => {return {product: v, scan: scan[v.product!.name!]}}
      ).filter(v => !!v.scan)
      const notFound = Object.entries(scan)
        .filter(([key]) => this.productNames.indexOf(key) == -1)
        .map(([, scan]) => {return {product: undefined, scan: new ScanResult(scan.productName, scan.scanValue, true)}})
      return of([... found, ... notFound])
    }),
  ))
  loadingSignal = computed(() => this.readRepository.loadingSignal())

  ngOnInit(): void {
    const httpParams = new HttpParams().append("objectName", this.data.paymentObject!.name!)
    this.readRepository.loadData({ params: httpParams })
  }
}
