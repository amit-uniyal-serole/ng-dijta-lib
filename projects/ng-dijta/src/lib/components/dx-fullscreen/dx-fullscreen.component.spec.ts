import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxFullscreenComponent } from './dx-fullscreen.component';

describe('DxFullscreenComponent', () => {
  let component: DxFullscreenComponent;
  let fixture: ComponentFixture<DxFullscreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxFullscreenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DxFullscreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
