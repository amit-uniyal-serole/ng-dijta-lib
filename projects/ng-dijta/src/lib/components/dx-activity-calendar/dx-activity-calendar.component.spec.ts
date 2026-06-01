import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxActivityCalendarComponent } from './dx-activity-calendar.component';

describe('DxActivityCalendarComponent', () => {
  let component: DxActivityCalendarComponent;
  let fixture: ComponentFixture<DxActivityCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxActivityCalendarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DxActivityCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
