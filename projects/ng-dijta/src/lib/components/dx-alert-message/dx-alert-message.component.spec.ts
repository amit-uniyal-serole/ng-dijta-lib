import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxAlertMessageComponent } from './dx-alert-message.component';

describe('DxAlertMessageComponent', () => {
  let component: DxAlertMessageComponent;
  let fixture: ComponentFixture<DxAlertMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxAlertMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DxAlertMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
