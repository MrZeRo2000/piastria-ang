import {Component, computed, inject} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {APP_INFO_READ_REPOSITORY} from "../../repository/repository-tokens";

@Component({
    selector: 'app-nav-top',
    templateUrl: './nav-top.component.html',
    imports: [
      RouterLink,
      RouterLinkActive,
      MatToolbarModule,
      MatButtonModule
    ],
    styleUrls: ['./nav-top.component.scss']
})
export class NavTopComponent {
  public appInfoRepository = inject(APP_INFO_READ_REPOSITORY);

  appInfoUnavailableSignal = computed(() => !this.appInfoRepository.dataSignal()[0])
}
