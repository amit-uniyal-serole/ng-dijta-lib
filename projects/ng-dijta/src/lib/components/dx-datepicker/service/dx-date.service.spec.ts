import { TestBed } from '@angular/core/testing';

import { DxDateService } from './dx-date.service';

describe('DxDateService', () => {
  let service: DxDateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DxDateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
