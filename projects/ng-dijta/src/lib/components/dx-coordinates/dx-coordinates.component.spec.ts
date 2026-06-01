import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxCoordinatesComponent } from './dx-coordinates.component';

describe('DxCoordinatesComponent', () => {
  let component: DxCoordinatesComponent;
  let fixture: ComponentFixture<DxCoordinatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxCoordinatesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DxCoordinatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
