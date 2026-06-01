import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxNotificationsComponent } from './dx-notification.component';

describe('DxNotificationsComponent', () => {
  let component: DxNotificationsComponent;
  let fixture: ComponentFixture<DxNotificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxNotificationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DxNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
