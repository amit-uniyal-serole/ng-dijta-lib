import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxFormCardComponent } from './dx-form-card.component';

describe('DxFormCardComponent', () => {
  let component: DxFormCardComponent;
  let fixture: ComponentFixture<DxFormCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxFormCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DxFormCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
