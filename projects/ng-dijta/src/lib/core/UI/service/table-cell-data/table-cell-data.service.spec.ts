import { TestBed } from '@angular/core/testing';

import { TableCellDataService } from './table-cell-data.service';

describe('TableCellDataService', () => {
  let service: TableCellDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TableCellDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
