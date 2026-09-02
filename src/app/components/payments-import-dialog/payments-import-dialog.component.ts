import { Component } from '@angular/core';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-payments-import-dialog',
  imports: [
    MatDialogTitle,
    MatDialogActions,
    MatDialogContent,
    MatButton,
    MatDialogClose
  ],
  templateUrl: './payments-import-dialog.component.html',
  styleUrl: './payments-import-dialog.component.scss',
})
export class PaymentsImportDialogComponent {

}
