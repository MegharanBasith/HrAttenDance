import { TestBed } from '@angular/core/testing';

import { ApiCallerService } from './api-caller.service';

describe('ApiService', () => {
  let service: ApiCallerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiCallerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
