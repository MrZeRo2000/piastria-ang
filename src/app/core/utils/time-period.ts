
export enum TimePeriodType {
  D = 'D',
  M = 'M',
  Q = 'Q'
}

export class TimePeriod {
  public static fromString(text: string | null | undefined): TimePeriod | null {
    if (text) {
      const parsedString = text.match(/(\d+)?(\w)/);
      if (!parsedString) {
        return null;
      }

      const periodType = TimePeriodType[parsedString[2] as keyof typeof TimePeriodType] ?? null;

      let quantity: number | null = null;
      if (periodType) {
        quantity = Number.parseInt(parsedString[1], 10) || 1;
      }

      return new TimePeriod(periodType, quantity);
    } else {
      return null;
    }
  }

  constructor(readonly periodType: TimePeriodType | null | undefined, readonly quantity: number | null = 1) {
    this.periodType = periodType;
    this.quantity = quantity;
  }

  public toString(): string {
    if (!this.periodType) {
      return '';
    }

    const quantityPart = this.quantity ? this.quantity.toString(10) : '1';
    return quantityPart + this.periodType.toString();
  }
}

export class TimePeriodUtils {
  public static truncateToPeriod(date: Date, periodType: TimePeriodType): Date | null {
    switch (periodType) {
      case TimePeriodType.M:
        return new Date(date.getFullYear(), date.getMonth(), 1);
      case TimePeriodType.Q:
        return new Date(date.getFullYear(), Math.trunc(date.getMonth() / 3) * 3, 1);
      default:
        return null;
    }
  }

  public static addPeriod(date: Date, timePeriod: TimePeriod): Date {
    const quantity = timePeriod.quantity ?? 1;
    switch (timePeriod.periodType) {
      case TimePeriodType.D:
        return new Date(date.getFullYear(), date.getMonth(), date.getDate() + quantity);
      case TimePeriodType.M:
        return new Date(date.getFullYear(), date.getMonth() + quantity, date.getDate());
      case TimePeriodType.Q:
        return new Date(date.getFullYear(), date.getMonth() + 3 * quantity, date.getDate());
      default:
        return date;
    }
  }
}
