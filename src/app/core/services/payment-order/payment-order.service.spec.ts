import { TestBed } from '@angular/core/testing';

import { PaymentOrderService } from './payment-order.service';

describe('PaymentOrderService', () => {
  let service: PaymentOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
