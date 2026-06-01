import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxCheckboxComponent } from './dx-checkbox.component';

describe('DxCheckboxComponent', () => {
  let component: DxCheckboxComponent;
  let fixture: ComponentFixture<DxCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxCheckboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DxCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
