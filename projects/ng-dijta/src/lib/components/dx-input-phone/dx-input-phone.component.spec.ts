import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxInputPhoneComponent } from './dx-input-phone.component';

describe('DxInputPhoneComponent', () => {
  let component: DxInputPhoneComponent;
  let fixture: ComponentFixture<DxInputPhoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DxInputPhoneComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DxInputPhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
