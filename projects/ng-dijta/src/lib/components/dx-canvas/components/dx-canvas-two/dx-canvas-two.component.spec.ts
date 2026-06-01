import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxCanvasTwoComponent } from './dx-canvas-two.component';

describe('DxCanvasTwoComponent', () => {
  let component: DxCanvasTwoComponent;
  let fixture: ComponentFixture<DxCanvasTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxCanvasTwoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DxCanvasTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
