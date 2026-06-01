import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxConfirmComponent } from './dx-confirm.component';

describe('DxConfirmComponent', () => {
  let component: DxConfirmComponent;
  let fixture: ComponentFixture<DxConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxConfirmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DxConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
