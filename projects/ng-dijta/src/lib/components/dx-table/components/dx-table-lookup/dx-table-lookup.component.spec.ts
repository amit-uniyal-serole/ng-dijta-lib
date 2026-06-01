import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxTableLookupComponent } from './dx-table-lookup.component';

describe('DxTableLookupComponent', () => {
  let component: DxTableLookupComponent<any>;
  let fixture: ComponentFixture<DxTableLookupComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxTableLookupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DxTableLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
