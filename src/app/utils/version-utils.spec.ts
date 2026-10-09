import {calcBackendVersionStatus} from './version-utils';

describe('calcBackendVersionStatus', () => {
  const calc = (backend: string) => calcBackendVersionStatus(backend, '0.10.4');

  it('same version: no difference', () => {
    expect(calc('0.10.4')).toEqual(expected(false, false));
  });

  it('older patch version: minor difference', () => {
    expect(calc('0.10.3')).toEqual(expected(true, false));
  });

  it('newer patch version: major difference', () => {
    expect(calc('0.10.5')).toEqual(expected(false, true));
  });

  it('different minor version: major difference', () => {
    expect(calc('0.9.4')).toEqual(expected(false, true));
    expect(calc('0.11.4')).toEqual(expected(false, true));
  });

  it('different major version: major difference', () => {
    expect(calc('1.10.4')).toEqual(expected(false, true));
  });

  function expected(minorDifference: boolean, majorDifference: boolean) {
    return {backendVersion: expect.any(String), supportedBackendVersion: '0.10.4', minorDifference, majorDifference};
  }
});
