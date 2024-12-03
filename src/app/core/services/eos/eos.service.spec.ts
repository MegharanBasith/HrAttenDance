import { TestBed } from '@angular/core/testing';

import { EosService } from './eos.service';

describe('EosService', () => {
  let service: EosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
