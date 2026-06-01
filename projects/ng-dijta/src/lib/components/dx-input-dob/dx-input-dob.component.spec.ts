import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxInputDOBComponent } from './dx-input-dob.component';

describe('DxInputDOBComponent', () => {
  let component: DxInputDOBComponent<any>;
  let fixture: ComponentFixture<DxInputDOBComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DxInputDOBComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DxInputDOBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
