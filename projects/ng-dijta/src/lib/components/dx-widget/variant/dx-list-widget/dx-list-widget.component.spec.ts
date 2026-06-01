import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxListWidgetComponent } from './dx-list-widget.component';

describe('DxCalenderTimelineComponent', () => {
  let component: DxListWidgetComponent;
  let fixture: ComponentFixture<DxListWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxListWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DxListWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
