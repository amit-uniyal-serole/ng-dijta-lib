import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxProfileComponent } from './dx-profile.component';

describe('DxProfileComponent', () => {
  let component: DxProfileComponent;
  let fixture: ComponentFixture<DxProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DxProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
