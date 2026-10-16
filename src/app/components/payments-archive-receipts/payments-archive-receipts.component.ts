import { Component } from '@angular/core';
import {DecimalPipe} from "@angular/common";
import {LoadingProgressComponent} from "../../core/components/loading-progress/loading-progress.component";
import {MatButton} from "@angular/material/button";
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {MatIcon} from "@angular/material/icon";
import {MatListOption, MatSelectionList} from "@angular/material/list";

@Component({
  selector: 'app-payments-archive-receipts',
    imports: [
        DecimalPipe,
        LoadingProgressComponent,
        MatButton,
        MatDialogActions,
        MatDialogClose,
        MatDialogContent,
        MatDialogTitle,
        MatIcon,
        MatListOption,
        MatSelectionList
    ],
  templateUrl: './payments-archive-receipts.component.html',
  styleUrl: './payments-archive-receipts.component.scss',
})
export class PaymentsArchiveReceiptsComponent {

}
