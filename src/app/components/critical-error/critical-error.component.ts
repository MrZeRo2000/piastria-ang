import {Component, Input} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-critical-error',
  templateUrl: './critical-error.component.html',
  styleUrls: ['./critical-error.component.scss'],
  imports: [MatCardModule, MatIconModule],
})
export class CriticalErrorComponent {
  @Input() errorMessage: string | undefined;
}
