import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxCalenderTimelineComponent } from './dx-calender-timeline.component';

describe('DxCalenderTimelineComponent', () => {
  let component: DxCalenderTimelineComponent;
  let fixture: ComponentFixture<DxCalenderTimelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxCalenderTimelineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DxCalenderTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
