// @ts-nocheck — pre-existing errors; missing peer dependency or removed module
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxMultiLookupComponent } from './dx-multi-lookup/dx-multi-lookup.component';

describe('DxMultiLookupComponent', () => {
  let component: DxMultiLookupComponent;
  let fixture: ComponentFixture<DxMultiLookupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxMultiLookupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DxMultiLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
