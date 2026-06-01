import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxDaterangeComponent } from './dx-daterange.component';

describe('DxDaterangeComponent', () => {
  let component: DxDaterangeComponent;
  let fixture: ComponentFixture<DxDaterangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxDaterangeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DxDaterangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
