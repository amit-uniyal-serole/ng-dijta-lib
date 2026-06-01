import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxAvatarGroupComponent } from './dx-avatar-group.component';

describe('DxAvatarGroupComponent', () => {
  let component: DxAvatarGroupComponent;
  let fixture: ComponentFixture<DxAvatarGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxAvatarGroupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DxAvatarGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
