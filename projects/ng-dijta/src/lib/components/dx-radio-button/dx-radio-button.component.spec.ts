import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxRadioButtonComponent } from './dx-radio-button.component';

describe('DxRadioButtonComponent', () => {
  let component: DxRadioButtonComponent;
  let fixture: ComponentFixture<DxRadioButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxRadioButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DxRadioButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
