import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxAdvanceFilterComponent } from './dx-advance-filter.component';

describe('DxAdvanceFilterComponent', () => {
  let component: DxAdvanceFilterComponent;
  let fixture: ComponentFixture<DxAdvanceFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxAdvanceFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DxAdvanceFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
