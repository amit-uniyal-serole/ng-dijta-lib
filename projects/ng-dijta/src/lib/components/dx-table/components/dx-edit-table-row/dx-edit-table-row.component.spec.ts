import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxEditTableRowComponent } from './dx-edit-table-row.component';

describe('DxEditTableRowComponent', () => {
  let component: DxEditTableRowComponent;
  let fixture: ComponentFixture<DxEditTableRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxEditTableRowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DxEditTableRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
