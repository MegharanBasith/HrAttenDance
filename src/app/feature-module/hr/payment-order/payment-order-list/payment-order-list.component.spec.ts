import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentOrderListComponent } from './payment-order-list.component';

describe('PaymentOrderListComponent', () => {
  let component: PaymentOrderListComponent;
  let fixture: ComponentFixture<PaymentOrderListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentOrderListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaymentOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
