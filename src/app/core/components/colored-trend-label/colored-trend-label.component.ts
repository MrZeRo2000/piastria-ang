import {Component, input, ChangeDetectionStrategy} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-core-colored-trend-label',
  templateUrl: './colored-trend-label.component.html',
  imports: [
    MatIconModule
  ],
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ['./colored-trend-label.component.scss']
})
export class ColoredTrendLabelComponent {
  value = input<any>();
}
