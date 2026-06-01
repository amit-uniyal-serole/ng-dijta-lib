import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxCardTextWrapperComponent } from './dx-card-text-wrapper.component';

describe('DxCardTextWrapperComponent', () => {
  let component: DxCardTextWrapperComponent;
  let fixture: ComponentFixture<DxCardTextWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxCardTextWrapperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DxCardTextWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
