import {BackendVersionStatus} from '../model/app-info';
import packageJson from '../../../package.json';

/**
 * Compares the backend version against the one this frontend supports (package.json "backendVersion").
 * Minor difference: the backend is older only in the last version segment (still compatible, show a warning).
 * Major difference: any other mismatch (incompatible, block the app).
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
      const minor = i === k - 1 && ncv > nbv;
      return {...status, minorDifference: minor, majorDifference: !minor};
    }
  }
  return {...status, minorDifference: false, majorDifference: false};
}
