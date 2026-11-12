import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsArchiveReceiptsComponent } from './payments-archive-receipts.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {RestUrlEnv} from '../../config/configuration';
import {RestDataSource} from '../../data-source/rest-data-source';
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';

describe('PaymentsArchiveReceiptsComponent', () => {
  let component: PaymentsArchiveReceiptsComponent;
  let fixture: ComponentFixture<PaymentsArchiveReceiptsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentsArchiveReceiptsComponent],
      providers: [
        RestUrlEnv, RestDataSource, provideHttpClient(withXhr(), withInterceptorsFromDi()), provideHttpClientTesting(),
        {provide: MatDialogRef, useValue: {close: () => {}}},
        {provide: MAT_DIALOG_DATA, useValue: {paymentObject: {id: 1, name: 'test'}}}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentsArchiveReceiptsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
