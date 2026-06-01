import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxDatetimePickerComponent } from './dx-datetime-picker.component';

describe('DxDatetimePickerComponent', () => {
  let component: DxDatetimePickerComponent<any>;
  let fixture: ComponentFixture<DxDatetimePickerComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxDatetimePickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DxDatetimePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
