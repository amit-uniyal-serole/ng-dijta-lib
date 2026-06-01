import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxTableFilterComponent } from './dx-table-filter.component';

describe('DxTableFilterComponent', () => {
  let component: DxTableFilterComponent;
  let fixture: ComponentFixture<DxTableFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxTableFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DxTableFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
