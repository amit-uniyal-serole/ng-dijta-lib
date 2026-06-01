import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxCardProfileComponent } from './dx-card-profile.component';

describe('DxCardProfileComponent', () => {
  let component: DxCardProfileComponent;
  let fixture: ComponentFixture<DxCardProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxCardProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DxCardProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
