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
import {map, of, switchMap, takeWhile, tap} from "rxjs";
import {ScanResult} from "../../model/scan";

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
  readonly data = inject<{paymentObject: PaymentObject, productNames: string[]}>(MAT_DIALOG_DATA);
  dataSignal = toSignal(this.readRepository.loadDataAction$.pipe(
    tap(() => {
      console.log(`starting signal with data ${JSON.stringify(this.data)}`)
    }),
    map(scan =>
      Object.fromEntries(
        scan.map(v => [v.productName, new ScanResult(v.productName, v.scanValue, this.data.productNames.indexOf(v.productName) == -1)])
      ) as {[index: string]: ScanResult}
    ),
    switchMap(scan => {
      const found = this.data.productNames.map(
        v => scan[v]
      ).filter(v => !!v)
      const notFound = Object.entries(scan)
        .filter(([key]) => this.data.productNames.indexOf(key) == -1)
        .map(([, scan]) => new ScanResult(scan.productName, scan.scanValue, true))
      return of([... found, ... notFound])
    }),
  ))
  loadingSignal = computed(() => this.readRepository.loadingSignal())

  ngOnInit(): void {
    console.log(`data passed: ${JSON.stringify(this.data)}`);
    const httpParams = new HttpParams().append("objectName", this.data.paymentObject!.name!)
    this.readRepository.loadData({ params: httpParams })
  }
}
