import {Component, inject, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment';
import {APP_INFO_READ_REPOSITORY} from "../../repository/repository-tokens";

@Component({
  selector: 'app-app-info',
  templateUrl: './app-info.component.html',
  styleUrls: ['./app-info.component.scss'],
})
export class AppInfoComponent implements OnInit {
  readRepository = inject(APP_INFO_READ_REPOSITORY)

  dataSignal = this.readRepository.dataSignal

  version = environment.VERSION;

  ngOnInit(): void {
    this.readRepository.loadData();
  }
}
