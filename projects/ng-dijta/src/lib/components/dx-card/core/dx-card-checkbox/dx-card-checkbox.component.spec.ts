import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxCardCheckboxComponent } from './dx-card-checkbox.component';

describe('DxCardCheckboxComponent', () => {
  let component: DxCardCheckboxComponent;
  let fixture: ComponentFixture<DxCardCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxCardCheckboxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DxCardCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
