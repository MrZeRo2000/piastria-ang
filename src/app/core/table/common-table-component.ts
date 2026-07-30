
import {Directive, OnInit} from '@angular/core';
import { HttpParams } from '@angular/common/http';
import {ReadRepository} from '../repository/read-repository';

export class CommonTableConfig {
  constructor(public loadOnInit: boolean) {
  }
}

@Directive()
 
export class CommonTableComponent<R> implements OnInit {
  protected config: CommonTableConfig = new CommonTableConfig(true);
  protected httpParams: HttpParams | undefined = undefined;

  repositoryData$ = this.readRepository.loadDataAction$

  // eslint-disable-next-line
  constructor(protected readRepository: ReadRepository<R>)  {}

  protected loadRepositoryData(): void {
    // updateMessages: surface load errors (e.g. as a snackbar) instead of failing silently.
    this.readRepository.loadData({params: this.httpParams, updateMessages: true});
  }

  // OnInit
  ngOnInit() {
    if (this.config.loadOnInit) {
      this.loadRepositoryData();
    }
  }
}
