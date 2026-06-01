import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxTableSlideToggleComponent } from './dx-table-slide-toggle.component';

describe('DxTableSlideToggleComponent', () => {
  let component: DxTableSlideToggleComponent;
  let fixture: ComponentFixture<DxTableSlideToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxTableSlideToggleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DxTableSlideToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
