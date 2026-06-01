import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxCanvasLabelValueWrapperComponent } from './dx-canvas-label-value-wrapper.component';

describe('DxCanvasLabelValueWrapperComponent', () => {
  let component: DxCanvasLabelValueWrapperComponent;
  let fixture: ComponentFixture<DxCanvasLabelValueWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxCanvasLabelValueWrapperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DxCanvasLabelValueWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
