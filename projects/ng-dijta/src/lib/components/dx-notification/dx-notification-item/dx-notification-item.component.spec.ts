import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxNotificationItemComponent } from './dx-notification-item.component';

describe('DxNotificationItemComponent', () => {
  let component: DxNotificationItemComponent;
  let fixture: ComponentFixture<DxNotificationItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DxNotificationItemComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DxNotificationItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
