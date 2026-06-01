import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxTimelineComponent } from './dx-timeline.component';

describe('TimelineComponent', () => {
  let component: DxTimelineComponent;
  let fixture: ComponentFixture<DxTimelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DxTimelineComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DxTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
