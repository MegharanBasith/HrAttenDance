import { TestBed } from '@angular/core/testing';

import { EarningDeductionService } from './earning-deduction.service';

describe('EarningDeductionService', () => {
  let service: EarningDeductionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EarningDeductionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
