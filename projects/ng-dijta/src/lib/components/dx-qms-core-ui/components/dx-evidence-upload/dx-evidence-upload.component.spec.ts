import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxEvidenceUploadComponent } from './dx-evidence-upload.component';

describe('DxEvidenceUploadComponent', () => {
  let component: DxEvidenceUploadComponent;
  let fixture: ComponentFixture<DxEvidenceUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxEvidenceUploadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DxEvidenceUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
