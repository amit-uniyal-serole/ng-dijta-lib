import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxDatepickerComponent } from './dx-datepicker.component';

describe('DxDatepickerComponent', () => {
  let component: DxDatepickerComponent<any>;
  let fixture: ComponentFixture<DxDatepickerComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DxDatepickerComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DxDatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
