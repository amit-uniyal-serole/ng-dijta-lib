import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxContentMenuAccrodianComponent } from './dx-content-menu-accrodian.component';

describe('DxContentMenuAccrodianComponent', () => {
  let component: DxContentMenuAccrodianComponent;
  let fixture: ComponentFixture<DxContentMenuAccrodianComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxContentMenuAccrodianComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DxContentMenuAccrodianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
