import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxCriteriaFilterComponent } from './dx-criteria-filter.component';

describe('DxCriteriaFilterComponent', () => {
  let component: DxCriteriaFilterComponent;
  let fixture: ComponentFixture<DxCriteriaFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxCriteriaFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DxCriteriaFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
