import {Component, inject, OnInit} from '@angular/core';
import {NgClass} from '@angular/common';
import {MatChip} from '@angular/material/chips';
import {environment} from '../../../environments/environment';
import {APP_INFO_READ_REPOSITORY} from "../../repository/repository-tokens";
import {BackendVersionService} from '../../utils/backend-version.service';

@Component({
  selector: 'app-app-info',
  templateUrl: './app-info.component.html',
  styleUrls: ['./app-info.component.scss'],
  imports: [MatChip, NgClass],
})
export class AppInfoComponent implements OnInit {
  readRepository = inject(APP_INFO_READ_REPOSITORY)

  versionStatus = inject(BackendVersionService).status;

  version = environment.VERSION;

  ngOnInit(): void {
    this.readRepository.loadData();
  }
}
