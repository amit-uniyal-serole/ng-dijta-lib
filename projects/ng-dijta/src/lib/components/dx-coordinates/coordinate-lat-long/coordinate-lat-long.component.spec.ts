import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordinateLatLongComponent } from './coordinate-lat-long.component';

describe('CoordinateLatLongComponent', () => {
  let component: CoordinateLatLongComponent;
  let fixture: ComponentFixture<CoordinateLatLongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoordinateLatLongComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoordinateLatLongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
