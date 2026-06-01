import { TestBed } from '@angular/core/testing';

import { DxTimelineService } from './timeline.service';

describe('DxTimelineService', () => {
  let service: DxTimelineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DxTimelineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
