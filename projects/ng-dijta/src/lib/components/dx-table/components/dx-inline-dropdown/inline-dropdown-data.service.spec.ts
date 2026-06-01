import { TestBed } from '@angular/core/testing';

import { InlineDropdownDataService } from './inline-dropdown-data.service';

describe('InlineDropdownDataService', () => {
  let service: InlineDropdownDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InlineDropdownDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
