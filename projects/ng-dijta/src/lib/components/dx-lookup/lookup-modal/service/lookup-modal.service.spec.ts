import { TestBed } from '@angular/core/testing';

import { LookupModalService } from './lookup-modal.service';

describe('LookupModalService', () => {
  let service: LookupModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LookupModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
