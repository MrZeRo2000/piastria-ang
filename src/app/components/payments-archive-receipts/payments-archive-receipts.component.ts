import {Component, inject, Input, signal} from '@angular/core';
import {DatePipe, DecimalPipe} from "@angular/common";
import {LoadingProgressComponent} from "../../core/components/loading-progress/loading-progress.component";
import {MatButton} from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatList, MatListItem} from "@angular/material/list";
import {ReceiptFileInfo} from "../../model/receipt-file-info";
import {PaymentObject} from "../../model/payment-object";
import {ARCHIVE_RECEIPT_CRUD_REPOSITORY} from "../../repository/repository-tokens";
import {CrudStatus} from "../../core/repository/crud-repository";
import {tap} from "rxjs";
import {MessagesService} from "../../messages/messages.service";
import {SuccessMessage} from "../../messages/message.model";
import {toSignal} from "@angular/core/rxjs-interop";
import {MatIcon} from "@angular/material/icon";
import {HttpParams} from "@angular/common/http";

@Component({
  selector: 'app-payments-archive-receipts',
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatList,
    MatListItem,
    DatePipe,
    DecimalPipe,
    MatIcon
  ],
  templateUrl: './payments-archive-receipts.component.html',
  styleUrl: './payments-archive-receipts.component.scss',
})
export class PaymentsArchiveReceiptsComponent {
  private readonly dialogRef = inject(MatDialogRef);
  readonly archiveRepository = inject(ARCHIVE_RECEIPT_CRUD_REPOSITORY);
  private readonly messagesService: MessagesService = inject(MessagesService)

  readonly data = inject<{paymentObject: PaymentObject, receiptFiles: ReceiptFileInfo[]}>(MAT_DIALOG_DATA);
  readonly files = this.data.receiptFiles;

  archiveLoadingSignal = signal(false)

  constructor() {
    toSignal(this.archiveAction$)
  }

  archiveAction$ = this.archiveRepository.crudAction$.pipe(
    tap(archiveResult => {
      this.archiveLoadingSignal.set(false)
      if (archiveResult.status == CrudStatus.Success) {
        const message = new SuccessMessage(archiveResult.data!.message! + " created successfully.");
        message.action = 'Ok'
        this.messagesService.reportMessage(message)
        this.dialogRef.close();
      }
    })

  );

  archiveOnClick(): void {
    this.archiveLoadingSignal.set(true);
    this.archiveRepository.postFormData(new HttpParams()
      .append('paymentObjectId', this.data!.paymentObject!.id!.toString(10)));
  }
}
