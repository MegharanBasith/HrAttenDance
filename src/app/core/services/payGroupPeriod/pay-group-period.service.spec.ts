import { TestBed } from '@angular/core/testing';

import { PayGroupPeriodService } from './pay-group-period.service';

describe('PayGroupPeriodService', () => {
  let service: PayGroupPeriodService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PayGroupPeriodService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
