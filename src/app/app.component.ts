import { Component, computed, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavTopComponent } from './components/nav-top/nav-top.component';
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { CriticalErrorComponent } from './components/critical-error/critical-error.component';
import { BackendVersionService } from './utils/backend-version.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    RouterOutlet,
    NavTopComponent,
    AppHeaderComponent,
    CriticalErrorComponent
  ]
})
export class AppComponent {
  title = 'Piastria';

  private backendVersionService = inject(BackendVersionService);

  versionError = computed(() => {
    const status = this.backendVersionService.status();
    return status?.majorDifference
      ? `Major incompatibility with backend version. Deploy at least ${status.supportedBackendVersion} backend version.`
      : undefined;
  });
}
