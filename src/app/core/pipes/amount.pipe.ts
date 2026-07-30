import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'amount'
})
export class AmountPipe implements PipeTransform {

  transform(value: number, precision?: number): string {
    // Cast preserves the pre-existing return type (some callers bind the result
    // directly to native `string` properties/inputs); the runtime value can
    // still be `null` for a falsy, non-zero `value`, exactly as before.
    return (((value || value === 0) && value.toFixed(precision === undefined || isNaN(precision) ? 2 : precision)) || null) as string;
  }

}
