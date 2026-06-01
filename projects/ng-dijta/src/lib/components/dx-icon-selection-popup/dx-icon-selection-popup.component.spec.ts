import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxIconSelectionPopupComponent } from './dx-icon-selection-popup.component';

describe('DxIconSelectionPopupComponent', () => {
  let component: DxIconSelectionPopupComponent;
  let fixture: ComponentFixture<DxIconSelectionPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxIconSelectionPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DxIconSelectionPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
