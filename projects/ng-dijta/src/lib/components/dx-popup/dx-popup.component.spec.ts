import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxPopupComponent } from './dx-popup.component';

describe('DxPopupComponent', () => {
  let component: DxPopupComponent;
  let fixture: ComponentFixture<DxPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DxPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
