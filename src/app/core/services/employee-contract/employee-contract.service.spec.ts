import { TestBed } from '@angular/core/testing';

import { EmployeeContractService } from './employee-contract.service';

describe('EmployeeContractService', () => {
  let service: EmployeeContractService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeContractService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
