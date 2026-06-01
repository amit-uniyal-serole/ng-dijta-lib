import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxAvatarWrapperComponent } from './dx-avatar-wrapper.component';
interface Demo {

}
describe('FlexAvatarComponent', () => {
  let component: DxAvatarWrapperComponent<Demo>;
  let fixture: ComponentFixture<DxAvatarWrapperComponent<Demo>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxAvatarWrapperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DxAvatarWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
