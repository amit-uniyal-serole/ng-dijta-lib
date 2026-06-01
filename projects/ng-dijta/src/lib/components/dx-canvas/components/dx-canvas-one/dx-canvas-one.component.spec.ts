import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxCanvasOneComponent } from './dx-canvas-one.component';

describe('DxCanvasOneComponent', () => {
  let component: DxCanvasOneComponent;
  let fixture: ComponentFixture<DxCanvasOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxCanvasOneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DxCanvasOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
