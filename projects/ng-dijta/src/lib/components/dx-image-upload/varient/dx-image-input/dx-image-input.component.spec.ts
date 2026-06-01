import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxImageInputComponent } from './dx-image-input.component';

describe('DxImageInputComponent', () => {
  let component: DxImageInputComponent;
  let fixture: ComponentFixture<DxImageInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxImageInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DxImageInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
