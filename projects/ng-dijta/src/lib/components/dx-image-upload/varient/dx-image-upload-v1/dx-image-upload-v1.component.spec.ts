import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxImageUploadV1Component } from './dx-image-upload-v1.component';

describe('DxImageUploadV1Component', () => {
  let component: DxImageUploadV1Component;
  let fixture: ComponentFixture<DxImageUploadV1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxImageUploadV1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DxImageUploadV1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
