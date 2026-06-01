import { TestBed } from '@angular/core/testing';

import { TableContextMenuDataService } from './table-context-menu-data.service';

describe('TableContextMenuDataService', () => {
  let service: TableContextMenuDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TableContextMenuDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
