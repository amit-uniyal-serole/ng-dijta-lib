import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxImpageUploadPopupComponent } from './dx-impage-upload-popup.component';

describe('DxImpageUploadPopupComponent', () => {
  let component: DxImpageUploadPopupComponent;
  let fixture: ComponentFixture<DxImpageUploadPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxImpageUploadPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DxImpageUploadPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
