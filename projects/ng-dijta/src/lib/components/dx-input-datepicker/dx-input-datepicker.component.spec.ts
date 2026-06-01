import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxInputDatePickerComponent } from './dx-input-datepicker.component';

describe('DxInputDatePickerComponent', () => {
  let component: DxInputDatePickerComponent<any>;
  let fixture: ComponentFixture<DxInputDatePickerComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DxInputDatePickerComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DxInputDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
