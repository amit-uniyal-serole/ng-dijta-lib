import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxCanvasThreeComponent } from './dx-canvas-three.component';

describe('DxCanvasThreeComponent', () => {
  let component: DxCanvasThreeComponent;
  let fixture: ComponentFixture<DxCanvasThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxCanvasThreeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DxCanvasThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
