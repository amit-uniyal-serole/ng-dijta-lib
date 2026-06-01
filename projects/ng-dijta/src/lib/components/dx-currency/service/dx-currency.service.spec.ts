import { TestBed } from '@angular/core/testing';

import { DxCurrencyService } from './dx-currency.service';

describe('DxCurrencyService', () => {
  let service: DxCurrencyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DxCurrencyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
