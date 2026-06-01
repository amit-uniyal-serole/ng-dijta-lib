import { TestBed } from '@angular/core/testing';

import { FlexMenuService } from './flex-menu.service';

describe('FlexMenuService', () => {
  let service: FlexMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlexMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
