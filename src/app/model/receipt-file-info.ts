export class ReceiptFileInfo {
  constructor(public fileName: string, public modifiedDate: Date) {
  }
}

export class ReceiptFileFolderInfo {
  constructor(public folderName: string, public fileList: ReceiptFileInfo[]) {}
}
