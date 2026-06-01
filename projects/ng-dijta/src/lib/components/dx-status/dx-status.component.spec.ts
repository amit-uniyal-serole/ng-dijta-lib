import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxStatusComponent } from './dx-status.component';

describe('DxStatusComponent', () => {
  let component: DxStatusComponent;
  let fixture: ComponentFixture<DxStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DxStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
