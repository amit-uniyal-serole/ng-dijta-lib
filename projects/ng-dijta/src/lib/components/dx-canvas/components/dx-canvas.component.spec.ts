import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxCanvasComponent } from './dx-canvas.component';

describe('DxCanvasComponent', () => {
  let component: DxCanvasComponent<any>;
  let fixture: ComponentFixture<DxCanvasComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DxCanvasComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DxCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
