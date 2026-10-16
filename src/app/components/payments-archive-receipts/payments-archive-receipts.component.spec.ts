import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsArchiveReceiptsComponent } from './payments-archive-receipts.component';

describe('PaymentsArchiveReceiptsComponent', () => {
  let component: PaymentsArchiveReceiptsComponent;
  let fixture: ComponentFixture<PaymentsArchiveReceiptsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentsArchiveReceiptsComponent]
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
