/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { WorkerDocumentService } from './WorkerDocument.service';

describe('Service: WorkerDocument', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WorkerDocumentService]
    });
  });

  it('should ...', inject([WorkerDocumentService], (service: WorkerDocumentService) => {
    expect(service).toBeTruthy();
  }));
});
