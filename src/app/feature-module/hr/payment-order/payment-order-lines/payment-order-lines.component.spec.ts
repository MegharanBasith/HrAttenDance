import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentOrderLinesComponent } from './payment-order-lines.component';

describe('PaymentOrderLinesComponent', () => {
  let component: PaymentOrderLinesComponent;
  let fixture: ComponentFixture<PaymentOrderLinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentOrderLinesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaymentOrderLinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
