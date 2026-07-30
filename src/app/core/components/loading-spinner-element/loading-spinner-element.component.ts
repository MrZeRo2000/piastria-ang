import { Component, ChangeDetectionStrategy } from '@angular/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-core-loading-spinner-element',
  templateUrl: './loading-spinner-element.component.html',
  imports: [
    MatProgressSpinnerModule
  ],
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ['./loading-spinner-element.component.scss']
})
export class LoadingSpinnerElementComponent {

}
