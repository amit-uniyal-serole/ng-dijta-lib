import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxTimePickerInputComponent } from './dx-time-picker-input.component';

describe('DxTimePickerInputComponent', () => {
  let component: DxTimePickerInputComponent;
  let fixture: ComponentFixture<DxTimePickerInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxTimePickerInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DxTimePickerInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
