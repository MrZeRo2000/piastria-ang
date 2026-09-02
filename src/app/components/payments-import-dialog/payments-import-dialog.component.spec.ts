import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsImportDialogComponent } from './payments-import-dialog.component';

describe('PaymentsImportDialogComponent', () => {
  let component: PaymentsImportDialogComponent;
  let fixture: ComponentFixture<PaymentsImportDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentsImportDialogComponent]
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
