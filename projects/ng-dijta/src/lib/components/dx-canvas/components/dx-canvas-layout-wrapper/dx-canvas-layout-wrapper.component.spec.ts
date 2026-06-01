import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxCanvasLayoutWrapperComponent } from './dx-canvas-layout-wrapper.component';

describe('DxCanvasLayoutWrapperComponent', () => {
  let component: DxCanvasLayoutWrapperComponent;
  let fixture: ComponentFixture<DxCanvasLayoutWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxCanvasLayoutWrapperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DxCanvasLayoutWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
