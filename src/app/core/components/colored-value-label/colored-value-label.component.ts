import {Component, computed, input} from '@angular/core';

export enum ColorScheme {
  NONE,
  POS_GREEN_NEG_RED
}

@Component({
  selector: 'app-core-colored-value-label',
  templateUrl: './colored-value-label.component.html',
  styleUrls: ['./colored-value-label.component.scss']
})
export class ColoredValueLabelComponent {
  // Accepts either a pre-formatted amount string (via the `amount` pipe) or a
  // raw number; numericValue below normalizes either form for the sign checks.
  value = input<number | string | null>();

  displayZero = input<boolean>();

  colorScheme = input<ColorScheme>();

  colorSchemeType = ColorScheme;

  protected readonly numericValue = computed(() => {
    const v = this.value();
    return v === null || v === undefined || v === '' ? null : Number(v);
  });
}
