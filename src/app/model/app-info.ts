export class AppInfo {
  constructor(public version: string) { }
}

export interface BackendVersionStatus {
  backendVersion: string,
  supportedBackendVersion: string,
  minorDifference: boolean,
  majorDifference: boolean,
}
