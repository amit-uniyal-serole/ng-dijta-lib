import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxUploadFilePopupComponent } from './dx-upload-file-popup.component';

describe('DxUploadFilePopupComponent', () => {
  let component: DxUploadFilePopupComponent;
  let fixture: ComponentFixture<DxUploadFilePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxUploadFilePopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DxUploadFilePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
