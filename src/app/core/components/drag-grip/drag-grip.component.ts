import { Component, ChangeDetectionStrategy } from '@angular/core';
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-core-drag-grip',
  templateUrl: './drag-grip.component.html',
  imports: [
    MatIconModule
  ],
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ['./drag-grip.component.scss']
})
export class DragGripComponent {
}
