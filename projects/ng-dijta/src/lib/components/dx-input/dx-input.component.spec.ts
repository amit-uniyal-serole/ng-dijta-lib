import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxInputComponent } from './dx-input.component';

describe('DxInputComponent', () => {
  let component: DxInputComponent;
  let fixture: ComponentFixture<DxInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DxInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
