import { Component, Input } from '@angular/core';
import { AppInfoComponent } from '../app-info/app-info.component';
import { BackupDatabaseButtonComponent } from '../backup-database-button/backup-database-button.component';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss'],
  imports: [
    AppInfoComponent,
    BackupDatabaseButtonComponent
  ]
})
export class AppHeaderComponent {
  @Input() title = '';
}
