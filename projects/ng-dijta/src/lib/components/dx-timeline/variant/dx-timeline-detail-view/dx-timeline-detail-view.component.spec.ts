import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxTimelineDetailViewComponent } from './dx-timeline-detail-view.component';

describe('DxTimelineDetailViewComponent', () => {
  let component: DxTimelineDetailViewComponent;
  let fixture: ComponentFixture<DxTimelineDetailViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxTimelineDetailViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DxTimelineDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
