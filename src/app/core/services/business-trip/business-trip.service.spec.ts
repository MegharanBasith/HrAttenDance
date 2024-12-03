import { TestBed } from '@angular/core/testing';

import { BusinessTripService } from './business-trip.service';

describe('BusinessTripService', () => {
  let service: BusinessTripService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusinessTripService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
