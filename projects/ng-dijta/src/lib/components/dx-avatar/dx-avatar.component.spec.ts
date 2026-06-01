import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxAvatarComponent } from './dx-avatar.component';

describe('DxAvatarComponent', () => {
  let component: DxAvatarComponent;
  let fixture: ComponentFixture<DxAvatarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxAvatarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DxAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
