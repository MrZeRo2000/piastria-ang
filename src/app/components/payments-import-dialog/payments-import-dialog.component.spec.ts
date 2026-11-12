import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsImportDialogComponent } from './payments-import-dialog.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {RestUrlEnv} from '../../config/configuration';
import {RestDataSource} from '../../data-source/rest-data-source';
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';

describe('PaymentsImportDialogComponent', () => {
  let component: PaymentsImportDialogComponent;
  let fixture: ComponentFixture<PaymentsImportDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentsImportDialogComponent],
      providers: [
        RestUrlEnv, RestDataSource, provideHttpClient(withXhr(), withInterceptorsFromDi()), provideHttpClientTesting(),
        {provide: MatDialogRef, useValue: {close: () => {}}},
        {provide: MAT_DIALOG_DATA, useValue: {paymentObject: {id: 1, name: 'test'}, payments: []}}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentsImportDialogComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
