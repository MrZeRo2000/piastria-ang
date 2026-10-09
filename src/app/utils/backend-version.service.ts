import {computed, inject, Injectable} from '@angular/core';
import {APP_INFO_READ_REPOSITORY} from '../repository/repository-tokens';
import {calcBackendVersionStatus} from './version-utils';

/** Backend version compatibility, derived from the shared app-info repository (loaded by AppInfoComponent). */
@Injectable({
  providedIn: 'root'
})
export class BackendVersionService {
  private readonly appInfoRepository = inject(APP_INFO_READ_REPOSITORY);

  readonly status = computed(() => {
    const appInfo = this.appInfoRepository.dataSignal()[0];
    return appInfo ? calcBackendVersionStatus(appInfo.version) : undefined;
  });

  readonly incompatible = computed(() => !!this.status()?.majorDifference);
}
