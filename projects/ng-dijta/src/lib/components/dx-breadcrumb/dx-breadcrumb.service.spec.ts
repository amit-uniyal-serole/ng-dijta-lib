import { TestBed } from '@angular/core/testing';

import { DxBreadcrumbService } from './dx-breadcrumb.service';

describe('DxBreadcrumbService', () => {
  let service: DxBreadcrumbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DxBreadcrumbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit pushed breadcrumb trails', () => {
    const trail = [{ label: 'Home', url: '/' }];
    service.updateBreadcrumb(trail);
    expect(service.newBreadcrumb.value).toEqual(trail);
  });

  it('should emit label maps', () => {
    service.updateBreadcrumbLabels({ id: '42' });
    expect(service.breadcrumbLabels.value).toEqual({ id: '42' });
  });
});
