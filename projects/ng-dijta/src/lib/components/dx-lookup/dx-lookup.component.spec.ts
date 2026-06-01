import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxLookupComponent } from './dx-lookup.component';

describe('DxLookupComponent', () => {
  let component: DxLookupComponent;
  let fixture: ComponentFixture<DxLookupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxLookupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DxLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
