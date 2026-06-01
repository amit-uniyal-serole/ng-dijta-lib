import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxNotificationComponent } from './dx-notification.component';

describe('DxNotificationComponent', () => {
  let component: DxNotificationComponent;
  let fixture: ComponentFixture<DxNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxNotificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DxNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
