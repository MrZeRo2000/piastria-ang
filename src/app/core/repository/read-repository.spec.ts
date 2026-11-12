import {withDates} from './read-repository';
import {ReceiptFileFolderInfo, ReceiptFileInfo} from '../../model/receipt-file-info';

describe('withDates', () => {
  it('converts top-level date fields without mutating the input', () => {
    const raw = {fileName: 'a.pdf', modifiedDate: '2026-01-02T03:04:05Z'};
    const result = withDates<ReceiptFileInfo>('modifiedDate')(raw);

    expect(result.modifiedDate).toEqual(new Date('2026-01-02T03:04:05Z'));
    expect(result.fileName).toBe('a.pdf');
    expect(raw.modifiedDate).toBe('2026-01-02T03:04:05Z');
  });

  it('leaves missing top-level values untouched', () => {
    const result = withDates<ReceiptFileInfo>('modifiedDate')({fileName: 'a.pdf'});
    expect(result.modifiedDate).toBeUndefined();
  });

  it('converts date fields on every element of a nested array property', () => {
    const raw = {
      folderName: 'f',
      fileList: [
        {fileName: 'a.pdf', modifiedDate: '2026-01-02T00:00:00Z'},
        {fileName: 'b.pdf', modifiedDate: '2026-02-03T00:00:00Z'}
      ]
    };
    const result = withDates<ReceiptFileFolderInfo>({fileList: ['modifiedDate']})(raw);

    expect(result.folderName).toBe('f');
    expect(result.fileList.map(f => f.modifiedDate)).toEqual([
      new Date('2026-01-02T00:00:00Z'),
      new Date('2026-02-03T00:00:00Z')
    ]);
    expect(result.fileList.map(f => f.fileName)).toEqual(['a.pdf', 'b.pdf']);
    expect(raw.fileList[0].modifiedDate).toBe('2026-01-02T00:00:00Z');
  });

  it('converts date fields on a nested single-object property', () => {
    type Holder = { file: ReceiptFileInfo };
    const result = withDates<Holder>({file: ['modifiedDate']})(
      {file: {fileName: 'a.pdf', modifiedDate: '2026-01-02T00:00:00Z'}});

    expect(result.file.modifiedDate).toEqual(new Date('2026-01-02T00:00:00Z'));
  });

  it('handles missing nested property and mixed specs', () => {
    type Mixed = { created: Date; files?: ReceiptFileInfo[] };
    const mapper = withDates<Mixed>('created', {files: ['modifiedDate']});

    const withoutFiles = mapper({created: '2026-01-02T00:00:00Z'});
    expect(withoutFiles.created).toEqual(new Date('2026-01-02T00:00:00Z'));
    expect(withoutFiles.files).toBeUndefined();

    const withFiles = mapper({created: '2026-01-02T00:00:00Z', files: [{fileName: 'a', modifiedDate: '2026-03-04T00:00:00Z'}]});
    expect(withFiles.files![0].modifiedDate).toEqual(new Date('2026-03-04T00:00:00Z'));
  });
});
