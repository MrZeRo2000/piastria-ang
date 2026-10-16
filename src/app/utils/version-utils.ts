import {BackendVersionStatus} from '../model/app-info';
import packageJson from '../../../package.json';

/**
 * Compares the backend version against the one this frontend supports (package.json "backendVersion").
 * Major difference: the 1st or 2nd segment differs, in either direction (incompatible, block the app).
 * Minor difference: only the 3rd segment differs, in either direction (tolerated, show a warning).
 */
export function calcBackendVersionStatus(
  backendVersion: string,
  supportedBackendVersion: string = packageJson.backendVersion
): BackendVersionStatus {
  const status = {backendVersion, supportedBackendVersion};
  if (supportedBackendVersion === backendVersion) {
    return {...status, minorDifference: false, majorDifference: false};
  }

  const cv = supportedBackendVersion.split('.');
  const bv = backendVersion.split('.');
  const k = Math.min(cv.length, bv.length);
  for (let i = 0; i < k; i++) {
    const ncv = parseInt(cv[i], 10);
    const nbv = parseInt(bv[i], 10);
    if (ncv !== nbv) {
      const minor = i >= 2;
      return {...status, minorDifference: minor, majorDifference: !minor};
    }
  }
  return {...status, minorDifference: false, majorDifference: false};
}
