import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxInputIconComponent } from './dx-input-icon.component';

describe('DxInputIconComponent', () => {
  let component: DxInputIconComponent;
  let fixture: ComponentFixture<DxInputIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxInputIconComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DxInputIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
