import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxCanvasFieldWrapperComponent } from './dx-canvas-field-wrapper.component';

describe('DxCanvasFieldWrapperComponent', () => {
  let component: DxCanvasFieldWrapperComponent;
  let fixture: ComponentFixture<DxCanvasFieldWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxCanvasFieldWrapperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DxCanvasFieldWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
