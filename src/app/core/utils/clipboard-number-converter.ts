export class ClipboardNumberConverter {

  public static getConverted(event: ClipboardEvent): number {
    const clipboardText = event.clipboardData?.getData('text');
    if (clipboardText) {
      const convertedText = clipboardText.trim().replace(',', '.');
      return parseFloat(convertedText);
    } else {
      // NaN (not undefined) to satisfy the `number` return type; callers already
      // guard with isNaN(...), and isNaN(NaN) === isNaN(undefined) === true, so
      // behavior is unchanged.
      return NaN;
    }
  }
}
