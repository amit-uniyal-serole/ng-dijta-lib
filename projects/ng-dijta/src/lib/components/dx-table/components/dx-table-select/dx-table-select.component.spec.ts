import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxTableSelectComponent } from './dx-table-select.component';

describe('DxTableSelectComponent', () => {
  let component: DxTableSelectComponent;
  let fixture: ComponentFixture<DxTableSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxTableSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DxTableSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
