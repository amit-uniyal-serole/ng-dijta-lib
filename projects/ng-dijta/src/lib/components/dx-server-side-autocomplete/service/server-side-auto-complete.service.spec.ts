import { TestBed } from '@angular/core/testing';

import { ServerSideAutoCompleteService } from './server-side-auto-complete.service';

describe('ServerSideAutoCompleteService', () => {
  let service: ServerSideAutoCompleteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServerSideAutoCompleteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
