import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxTimelineItemComponent } from './dx-timeline-item.component';

describe('DxTimelineItemComponent', () => {
  let component: DxTimelineItemComponent;
  let fixture: ComponentFixture<DxTimelineItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DxTimelineItemComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DxTimelineItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
